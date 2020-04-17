import React, { Component } from 'react'; 
import Card from "./Card"
import axios from 'axios';
const API_BASEURL = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {
    constructor(props){
        super(props);
        this.state = { deck: null, drawn: [] }
        this.getCard = this.getCard.bind(this);
    }
    //async just lets it wait for whenever it's accessed.
    //await does the same
    async componentDidMount(){
        let deck = await axios.get(`${API_BASEURL}/new/shuffle/`);
        this.setState({ deck: deck.data });
    }

    async getCard() {
        //make request from dick id
        let deck_id = this.state.deck.deck_id;
        try{
        let cardUrl = `${API_BASEURL}/${deck_id}/draw`;
        let cardRes = await axios.get(cardUrl)
        if(!cardRes.data.success) {
            throw new Error("No more cards in deck")
        }
        let card = cardRes.data.cards[0];
        console.log(cardRes.data);
        this.setState(st => ({
            drawn: [
                ...st.drawn,
            {
            id: card.code, 
            image: card.image,
            name: `${card.suit} ${card.value}`
            }
        ]
        }));
    } catch (err) {
    alert(err)
    }
    }
    render(){
        const cards = this.state.drawn.map(c => (
            <Card key= {c.id} name={c.name} image={c.image} />
        ));
        return (
            <div className="Deck">
                <h1 className="Deck-title">Card Dealer</h1>
                <h2 className="Deck-title subtitle">React card game.</h2>
                <button className="Deck-btn" onClick={this.getCard}>Get Card!</button>
                <div className="Deck-cardarea">{cards}</div>
            </div>
        );
    }   
}
export default Deck;