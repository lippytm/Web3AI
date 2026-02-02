#!/usr/bin/env python3
"""
AI Diagnostics Sandbox

This script provides a diagnostic environment for testing and validating
AI model interactions, allowing transparency in AI behavior and responses.
"""

import sys
from pathlib import Path

# Add parent directory to path to import app modules
sys.path.insert(0, str(Path(__file__).parent.parent.parent / "backend"))

try:
    from app.settings import Settings
    from langchain_openai import ChatOpenAI
except ImportError as e:
    print(f"Error importing required modules: {e}")
    print("Please ensure you're in the backend virtual environment")
    print("and have installed requirements: pip install -r requirements.txt")
    sys.exit(1)


def test_ai_model_connection():
    """Test connection to AI model and validate configuration."""
    print("=" * 60)
    print("AI Model Diagnostics")
    print("=" * 60)
    
    try:
        settings = Settings()
        print("\n✓ Configuration loaded successfully")
        print(f"  Model: {settings.model_name}")
        print(f"  API Key configured: {bool(settings.openai_api_key)}")
    except Exception as e:
        print(f"\n✗ Configuration error: {e}")
        return False
    
    return True


def test_ai_prompt(prompt: str = "Explain blockchain in one sentence"):
    """Test AI model with a sample prompt."""
    print("\n" + "=" * 60)
    print("AI Prompt Test")
    print("=" * 60)
    
    try:
        settings = Settings()
        llm = ChatOpenAI(
            model=settings.model_name,
            api_key=settings.openai_api_key.get_secret_value(),
            temperature=0.7
        )
        
        print(f"\nPrompt: {prompt}")
        print("\nResponse:")
        print("-" * 60)
        
        response = llm.invoke(prompt)
        print(response.content)
        print("-" * 60)
        print("\n✓ AI model responded successfully")
        
        return True
    except Exception as e:
        print(f"\n✗ AI model error: {e}")
        return False


def run_diagnostics():
    """Run all diagnostic tests."""
    print("\n" + "🔬 " + "Running AI Diagnostics Sandbox" + " 🔬")
    print("This sandbox provides transparency into AI model behavior\n")
    
    results = []
    
    # Test 1: Configuration
    results.append(("Configuration Test", test_ai_model_connection()))
    
    # Test 2: AI Prompt
    if results[0][1]:  # Only run if config is valid
        results.append(("AI Prompt Test", test_ai_prompt()))
    
    # Summary
    print("\n" + "=" * 60)
    print("Diagnostics Summary")
    print("=" * 60)
    
    for test_name, passed in results:
        status = "✓ PASSED" if passed else "✗ FAILED"
        print(f"{test_name}: {status}")
    
    all_passed = all(result[1] for result in results)
    print("\n" + "=" * 60)
    
    if all_passed:
        print("✓ All diagnostics passed!")
    else:
        print("✗ Some diagnostics failed. Check configuration.")
    
    return all_passed


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="AI Diagnostics Sandbox")
    parser.add_argument(
        "--prompt",
        type=str,
        help="Custom prompt to test AI model"
    )
    
    args = parser.parse_args()
    
    if args.prompt:
        test_ai_prompt(args.prompt)
    else:
        run_diagnostics()
