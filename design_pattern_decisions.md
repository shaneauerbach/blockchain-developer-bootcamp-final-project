# Design patterns used

## Satisfies requirements here: https://docs.google.com/document/d/1tthsXLlv5BDXEGUfoP6_MAsL_8_T0sRBNQs_1OnPxak/edit

1. Inheritance and Interfaces: I import both Ownable and Pausable from OpenZeppelin.
2. Access Control Design Patterns: I use Ownable's onlyOwner modifier on the getCurrentTime() function just as an example, i.e. it's not really necessary. I also have custom ownership/roles logic built in the contract. Only past contributors to a What entry may vote on a proposed entry. There is an ownership mapping that tracks this and a custom isOwner modifier. I understand it's best to rely on battle tested ownership constructs like what OpenZeppelin offers, but for the purposes of learning I thought it was fun to do it myself.