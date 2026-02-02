const { expect } = require("chai");
const { ethers } = require("hardhat");

/**
 * SimpleStorage Sandbox Tests
 * 
 * This test suite provides transparent validation of smart contract behavior
 * for diagnostics and simulation purposes.
 */
describe("SimpleStorage Sandbox", function () {
  let simpleStorage;
  let owner;
  let addr1;
  
  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorage.deploy();
    await simpleStorage.waitForDeployment();
  });
  
  describe("Deployment Diagnostics", function () {
    it("Should set the right owner", async function () {
      expect(await simpleStorage.owner()).to.equal(owner.address);
    });
    
    it("Should initialize with zero value", async function () {
      expect(await simpleStorage.get()).to.equal(0);
    });
  });
  
  describe("Storage Operations Simulation", function () {
    it("Should store and retrieve value", async function () {
      const testValue = 42;
      
      await simpleStorage.set(testValue);
      expect(await simpleStorage.get()).to.equal(testValue);
    });
    
    it("Should emit ValueChanged event on set", async function () {
      const oldValue = 0;
      const newValue = 100;
      
      await expect(simpleStorage.set(newValue))
        .to.emit(simpleStorage, "ValueChanged")
        .withArgs(oldValue, newValue, owner.address);
    });
    
    it("Should increment value correctly", async function () {
      await simpleStorage.set(5);
      await simpleStorage.increment();
      expect(await simpleStorage.get()).to.equal(6);
    });
    
    it("Should decrement value correctly", async function () {
      await simpleStorage.set(5);
      await simpleStorage.decrement();
      expect(await simpleStorage.get()).to.equal(4);
    });
    
    it("Should revert on decrement below zero", async function () {
      await expect(simpleStorage.decrement())
        .to.be.revertedWith("Cannot decrement below zero");
    });
  });
  
  describe("Multi-User Simulation", function () {
    it("Should allow different users to modify value", async function () {
      await simpleStorage.connect(owner).set(10);
      expect(await simpleStorage.get()).to.equal(10);
      
      await simpleStorage.connect(addr1).set(20);
      expect(await simpleStorage.get()).to.equal(20);
    });
    
    it("Should track who changed the value", async function () {
      await expect(simpleStorage.connect(addr1).set(50))
        .to.emit(simpleStorage, "ValueChanged")
        .withArgs(0, 50, addr1.address);
    });
  });
  
  describe("Gas Usage Diagnostics", function () {
    it("Should report gas used for set operation", async function () {
      const tx = await simpleStorage.set(123);
      const receipt = await tx.wait();
      
      console.log(`      Gas used for set(): ${receipt.gasUsed.toString()}`);
      expect(receipt.gasUsed).to.be.lessThan(100000);
    });
    
    it("Should report gas used for increment operation", async function () {
      const tx = await simpleStorage.increment();
      const receipt = await tx.wait();
      
      console.log(`      Gas used for increment(): ${receipt.gasUsed.toString()}`);
      expect(receipt.gasUsed).to.be.lessThan(100000);
    });
  });
});
