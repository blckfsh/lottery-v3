pragma solidity ^0.8.0;

import "./SampleToken.sol";

contract Lottery {

  IERC20 public token;

  event Transfer(address _from, address _destAddr, uint _amount);

  // List of players registered in lottery
  address payable[] public players;
  address public owner;

  constructor(IERC20 _token) public {
    token = _token;
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(owner == msg.sender, "You are not the owner");
    _;
  }

  function acceptToken(uint amount) external {

    address from = msg.sender;
    address to = address(this);

    // makes sure that the owner cannot participate in Lottery
    require(from != owner);
    require(amount > 0, "Bet atleast 1 token");

    // transfer token from player to contract
    token.transferFrom(from, to, amount);

    // pushing the account conducting the transaction onto the players array as a payable address
    players.push(payable(from));

    emit Transfer(from, to, amount);
  }

  function getTokenBalanceOf(address addr) public view returns (uint) {
    return token.balanceOf(addr);
  }

  function getBalance() public view onlyOwner returns(uint) {
    // returns the contract balance
    return address(this).balance;
  }

  function random() internal view returns(uint) {
    return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players.length)));
  }

  function pickWinner() public onlyOwner {
    // makes sure that we have enough players in the lottery
    // require(players.length >= 3, "Not enough players in the lottery");

    address payable winner;

    // selects the winner with the random number
    winner = players[random() % players.length];
    uint prize = (getTokenBalanceOf(address(this)) * 70) / 100;
    uint burn_token = (getTokenBalanceOf(address(this)) * 30) / 100;

    // transfers balance to winner => 70% of lottery pool
    token.transfer(winner, prize);

    // burn the rest of the pool => 30% of lottery pool
    token.transfer(owner, burn_token);

    // resets the players array once someone is picked
    resetLottery();
  }

  function resetLottery() internal {
    players = new address payable[](0);
  }

}
