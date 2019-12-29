class Collector {
  constructor(session) {
    this.session = session;
    this.config = {
      position:[0,0,0],
      block:'air',
      data:0,
      method:'replace',
      block2:'',
      data2:''
    }
    this.history = {
      position:[],
      players:[]
    }
  }

  async getPosition(target){
    target = target === 'begin' ? 'begin' : target === 'end' ? 'end' : 'position';
    let position = await this.session.sendCommandSync(`testforblock ~ ~ ~ air`);
    this.history.position.push(Object.values(position.position));
    this.config[target] = Object.values(position.position);
    return Object.values(position.position);
  }

  async getPlayer(){
    let players = await this.session.sendCommandSync('list');
    this.history.players.push(typeof players.players == "Array" ? players.players : [players.players]);
    return this.history.players[this.history.players.length - 1];
  }

  getHistory(v){
    return this.history[v];
  }
}
module.exports = Collector;
