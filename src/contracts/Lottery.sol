pragma solidity ^0.8.0;

import "./SampleToken.sol";

contract Lottery {

  IERC20 public token;

  event Transfer(address _from, address _destAddr, uint _amount);

  struct Player {
    string id;
    string date;
    address wallet_address;
    uint amount;
    uint entry;
    string status;
  }

  /* mapping (address => Player) players; */
  mapping (string => Player) players;

  // List of players registered in lottery
  uint public playerId;
  address[] public playerAccounts;
  address[] public playerEntry;
  address public owner;

  constructor(IERC20 _token) public {
    token = _token;
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(owner == msg.sender, "You are not the owner");
    _;
  }

  function getPlayers() public view returns (address[] memory) {
    return playerAccounts;
  }

  function getPlayerByAddress(string memory _address) view public returns (string memory, string memory, address, uint, uint, string memory) {
     return (players[_address].id, players[_address].date, players[_address].wallet_address, players[_address].amount, players[_address].entry, players[_address].status);
  }

  /* function getPlayerByAddress(address _address) view public returns (string memory, string memory, address, uint, uint, string memory) {
     return (players[_address].id, players[_address].date, players[_address].wallet_address, players[_address].amount, players[_address].entry, players[_address].status);
  } */

  function acceptToken(string memory _id, string memory _date, uint _amount, uint _entry, string memory _status) external {

    address _from = msg.sender;
    address _to = address(this);

    // makes sure that the owner cannot participate in Lottery
    require(_from != owner);
    require(_amount > 0, "Bet atleast 1 token");

    // transfer token from player to contract
    token.transferFrom(_from, _to, _amount);

    // sending participant details on array
    players[_id].id = _id;
    players[_id].date = _date;
    players[_id].wallet_address = _from;
    players[_id].amount = _amount;
    players[_id].entry = _entry;
    players[_id].status = _status;

    // pushing the account conducting the transaction onto the players array as a payable address
    playerAccounts.push(_from);
    for (uint count; count < _entry; count++) {
      playerEntry.push(_from);
    }

    emit Transfer(_from, _to, _amount);
  }

  function getTokenBalanceOf(address addr) public view returns (uint) {
    return token.balanceOf(addr);
  }

  function getBalance() public view onlyOwner returns(uint) {
    // returns the contract balance
    return address(this).balance;
  }

  function random() internal view returns(uint) {
    return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, playerAccounts.length)));
  }

  function pickWinner() public onlyOwner {
    // makes sure that we have enough players in the lottery
    // require(players.length >= 3, "Not enough players in the lottery");

    address _winner;

    // selects the winner with the random number
    _winner = playerAccounts[random() % playerAccounts.length];
    uint _prize = (getTokenBalanceOf(address(this)) * 70) / 100;
    uint _burn_token = (getTokenBalanceOf(address(this)) * 30) / 100;

    // transfers balance to winner => 70% of lottery pool
    token.transfer(_winner, _prize);

    // burn the rest of the pool => 30% of lottery pool
    token.transfer(owner, _burn_token);

    // resets the players array once someone is picked
    resetLottery();
  }

  function resetLottery() internal {
    playerAccounts = new address[](0);
    playerEntry = new address[](0);
  }

}
