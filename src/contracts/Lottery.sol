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
  string[] public playerIds;
  string[] public allPlayerIds;
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

  function getPlayerEntries() public view returns (address[] memory) {
    return playerEntry;
  }

  function getPlayers() public view returns (string[] memory) {
    return playerIds;
  }

  function getAllPlayers() public view returns (string[] memory) {
    return allPlayerIds;
  }

  function getPlayerById(string memory _id) view public returns (string memory, string memory, address, uint, uint, string memory) {
     return (players[_id].id, players[_id].date, players[_id].wallet_address, players[_id].amount, players[_id].entry, players[_id].status);
  }

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
    playerIds.push(_id);
    allPlayerIds.push(_id);
    for (uint count; count < _entry; count++) {
      playerEntry.push(_from);
    }

    emit Transfer(_from, _to, _amount);
  }

  function getTokenBalanceOf(address _addr) public view returns (uint) {
    return token.balanceOf(_addr);
  }

  function getBalance() public view onlyOwner returns(uint) {
    // returns the contract balance
    return address(this).balance;
  }

  function random() internal view returns(uint) {
    return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, playerIds.length)));
  }

  function pickWinner(address _winner, uint _prize, uint _burn, uint _guild) public onlyOwner {
    // makes sure that we have enough players in the lottery
    // require(players.length >= 3, "Not enough players in the lottery");

    // selects the winner with the random number
    // _winner = playerEntry[random() % playerEntry.length];
    uint _prize_token = (getTokenBalanceOf(address(this)) * _prize) / 100;
    uint _burn_token = (getTokenBalanceOf(address(this)) * _burn) / 100;
    uint _guild_token = (getTokenBalanceOf(address(this)) * _guild) / 100;

    // transfers balance to winner
    token.transfer(_winner, _prize_token);

    // burn the rest of the pool
    token.transfer(owner, _burn_token);

    // guild the rest of the pool
    token.transfer(owner, _guild_token);

    // resets the players array once someone is picked
    resetLottery();
  }

  function resetLottery() internal {
    playerIds = new string[](0);
    playerEntry = new address[](0);
  }

}
