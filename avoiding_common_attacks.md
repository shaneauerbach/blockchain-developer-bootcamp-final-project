# Avoiding common pitfalls

## Satisfies requirements here: https://docs.google.com/document/d/1tthsXLlv5BDXEGUfoP6_MAsL_8_T0sRBNQs_1OnPxak/edit

1. Using specific compile pragma: the contract required pragma solidity 0.8.0;
2. Using modifiers only for validations: all of my modifiers are validations to check that the state, sender, and message are correct for a function to be called.
3. Proper use of require, assert, and revert: I do all of the validation in modifiers with require. I use assert in the testing file but not in the contract.
4. Checks-Effects-Interactions: My contract actually has no interactions(!), but it does checks and then effects.

We're not really doing anything to careful against attacks. While we do have a concept of ownership, there is no transferable token associated with this version project, so there's little risk of abuse.