#!/usr/bin/env python3
"""
Blockchain Simulation Sandbox

This script provides a simulation environment for testing blockchain
interactions with transparency in transaction behavior and results.
"""

import sys
from pathlib import Path

# Add parent directory to path to import app modules
sys.path.insert(0, str(Path(__file__).parent.parent.parent / "backend"))

try:
    from app.settings import Settings
    from web3 import Web3
except ImportError as e:
    print(f"Error importing required modules: {e}")
    print("Please ensure you're in the backend virtual environment")
    print("and have installed requirements: pip install -r requirements.txt")
    sys.exit(1)


def test_rpc_connection():
    """Test connection to blockchain RPC endpoint."""
    print("=" * 60)
    print("Blockchain RPC Connection Test")
    print("=" * 60)
    
    try:
        settings = Settings()
        print("\n✓ Configuration loaded")
        print(f"  Network: {settings.network}")
        print(f"  RPC URL: {settings.eth_rpc_url}")
        
        w3 = Web3(Web3.HTTPProvider(settings.eth_rpc_url))
        
        if w3.is_connected():
            print("\n✓ Connected to blockchain")
            return w3
        else:
            print("\n✗ Failed to connect to blockchain")
            return None
    except Exception as e:
        print(f"\n✗ Connection error: {e}")
        return None


def get_network_info(w3: Web3):
    """Retrieve and display network information."""
    print("\n" + "=" * 60)
    print("Network Information")
    print("=" * 60)
    
    try:
        chain_id = w3.eth.chain_id
        block_number = w3.eth.block_number
        gas_price = w3.eth.gas_price
        
        print(f"\nChain ID: {chain_id}")
        print(f"Latest Block: {block_number}")
        print(f"Current Gas Price: {w3.from_wei(gas_price, 'gwei')} Gwei")
        
        # Get latest block details
        latest_block = w3.eth.get_block('latest')
        print("\nLatest Block Details:")
        print(f"  Hash: {latest_block['hash'].hex()}")
        print(f"  Timestamp: {latest_block['timestamp']}")
        print(f"  Transactions: {len(latest_block['transactions'])}")
        
        return True
    except Exception as e:
        print(f"\n✗ Error retrieving network info: {e}")
        return False


def simulate_balance_check(w3: Web3, address: str = None):
    """Simulate checking account balance."""
    print("\n" + "=" * 60)
    print("Balance Check Simulation")
    print("=" * 60)
    
    # Use a well-known address for demo (Ethereum Foundation)
    if address is None:
        address = "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe"
    
    try:
        if not w3.is_address(address):
            print(f"\n✗ Invalid address: {address}")
            return False
        
        checksum_address = w3.to_checksum_address(address)
        balance_wei = w3.eth.get_balance(checksum_address)
        balance_eth = w3.from_wei(balance_wei, 'ether')
        
        print(f"\nAddress: {checksum_address}")
        print(f"Balance: {balance_eth} ETH")
        print(f"Balance (Wei): {balance_wei}")
        
        return True
    except Exception as e:
        print(f"\n✗ Error checking balance: {e}")
        return False


def run_simulation():
    """Run blockchain simulation tests."""
    print("\n" + "⛓️  " + "Running Blockchain Simulation Sandbox" + " ⛓️")
    print("This sandbox provides transparency into blockchain interactions\n")
    
    results = []
    
    # Test 1: RPC Connection
    w3 = test_rpc_connection()
    results.append(("RPC Connection", w3 is not None))
    
    if w3:
        # Test 2: Network Info
        results.append(("Network Information", get_network_info(w3)))
        
        # Test 3: Balance Check
        results.append(("Balance Check", simulate_balance_check(w3)))
    
    # Summary
    print("\n" + "=" * 60)
    print("Simulation Summary")
    print("=" * 60)
    
    for test_name, passed in results:
        status = "✓ PASSED" if passed else "✗ FAILED"
        print(f"{test_name}: {status}")
    
    all_passed = all(result[1] for result in results)
    print("\n" + "=" * 60)
    
    if all_passed:
        print("✓ All simulations passed!")
    else:
        print("✗ Some simulations failed. Check configuration.")
    
    return all_passed


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Blockchain Simulation Sandbox")
    parser.add_argument(
        "--address",
        type=str,
        help="Ethereum address to check balance"
    )
    
    args = parser.parse_args()
    
    if args.address:
        settings = Settings()
        w3 = Web3(Web3.HTTPProvider(settings.eth_rpc_url))
        if w3.is_connected():
            simulate_balance_check(w3, args.address)
        else:
            print("Failed to connect to blockchain")
    else:
        run_simulation()
