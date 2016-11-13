const React = require('react');
const ReactDOM = require('react-dom');
const socket = require('socket.io-client')();
const Sound = require('react-sound');
const _ = require('lodash');
const Main = React.createClass({
    displayName: 'Main',
    getInitialState() {
        return {
            data: false,
            sound: 'clickAgain',
            status: Sound.status.STOPPED,
            display: 'none',
            pict: 'clickAgain'
        };
    },
    componentDidMount() {
        socket.on("loadDataClient", (data) => {
            this.setState({data: JSON.parse(data)});
        });
    },
    loadData() {
        socket.emit("loadDataServer");
    },
    playSound(name) {
        this.setState({
            sound: name,
            pict: name,
            status: Sound.status.PLAYING,
            display: (name == 'clickAgain' || name == 'wantRabbit') ? 'none' : 'block'
        });
    },
    stopPlaying() {
        this.setState({
            sound: Sound.status.STOPPED,
            display: 'none'
        });
    },
    render() {
        let data;
        if (this.state.data) {
            data = this.state.data.map((elem, index) => <div key={index} className="column fill card">
                <div className="fix pad-item">Логин: {elem.login}</div>
                <div className="fix pad-item">Email: {elem.email}</div>
                <div className="fix pad-item">Пароль: {elem.password}</div>
                <div className="fix pad-item">Средняя оценка: {elem.mark}</div>
            </div>);
        }
        return <div className="column fill wrap align-center pad-item">
            <div className="row fill wrap align-center pad-item">
                <div className="card">
                    <div className="btn" onClick={this.loadData}>Load data</div>
                </div>
                <div className="card">
                    <div className="btn" onClick={() => {this.playSound('clickAgain')}}>Кликни меня</div>
                </div>
                <div className="card">
                    <div className="btn" onClick={() => {this.playSound('allBad')}}>М - значит мотивация</div>
                </div>
                <div className="card">
                    <div className="btn" onClick={() => {this.playSound('readDocks')}}>Когда не можешь найти где ошибка…</div>
                </div>
                <div className="card">
                    <div className="btn" onClick={() => {this.playSound('wantEat')}}>Сергей, как дела?</div>
                </div>
                <Sound
                    url={"/sound/" + this.state.sound + ".mp3"}
                    playStatus={this.state.status}
                    onLoading={this.handleSongLoading}
                    onPlaying={this.handleSongPlaying}
                    onFinishedPlaying={this.stopPlaying} />
            </div>
            <div className="column fill align-center pad-item">
                <div className="row fill wrap pad-item">
                    {data}
                </div>
            </div>
        </div>;
    }
});

ReactDOM.render(<Main />, document.getElementById('react'));

{/* <div className="fill">
    <img src={"/pict/" + this.state.pict + ".jpg"} style={{
        display: this.state.display,
        height: "400px"
    }} />
</div> */}
