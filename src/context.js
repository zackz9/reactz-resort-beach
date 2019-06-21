import React, {Component} from 'react';
// import items from './data';
import Client from './contentful';

// Client.getEntries({
//   content_type:'resort'
// }).then((response) => console.log(response.items));

//Création d'un contexte pour les données
const RoomContext = React.createContext();
//<RoomContext.Provider value={'Object'}

class RoomProvider extends React.Component {

//Search filter started at type of state
  state = {

    rooms:[],
    sortedRooms:[],
    featuredRooms:[],
    loading:true,
    type:'all',
    capacity:1,
    price:0,
    minPrice:0,
    maxPrice:0,
    minSize:0,
    maxSize:0,
    breakfast:false,
    pets:false

  };

//Récupération des données getData

  getData = async() => {

      try {

        let response =  await Client.getEntries({
          content_type:'resort',
          order: '-fields.price'

        });
        //Prendre la var response en tant que param au lieu des items(data loc)
        let rooms = this.formatData(response.items);
        let featuredRooms = rooms.filter(room => room.featured === true);

        let maxPrice = Math.max(...rooms.map(item => item.price));
        let maxSize = Math.max(...rooms.map(item => item.size));


        this.setState({
          rooms,
          featuredRooms,
          sortedRooms:rooms,
          loading:false,
          price:maxPrice,
          maxPrice,
          maxSize
        });


      } catch (e) {
        console.log(e);
      }
  }


  componentDidMount(){
    //Changement de lemplacement des items(data interne) en tant que parametres par response(data externe)

    this.getData();

  };

  formatData(items){
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image=>image.fields.file.url);
      let room = {...item.fields, images, id};
      return room;
    });

    return tempItems;
  };

  getRoom =(slug) => {
      let tempRooms = [...this.state.rooms];
      const room = tempRooms.find(room => room.slug === slug);

      return room;
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type ==="checkbox" ? target.checked : target.value;
    const name = event.target.name;

    // console.log(`Type: ${type}, name : ${name}, value: ${value}`)

    this.setState({
                    [name]:value
                  },this.filterRooms);
  };

  filterRooms = ()  => {

    let {
      rooms, type, capacity,price, minSize, maxSize, breakfast, pets
    } = this.state;

    //Récup de tous les articles

    let tempRooms = [...rooms];

    //Transformation des valeurs

    capacity = parseInt(capacity);
    price = parseInt(price);

    //Filtrer les données par type
    if(type !== 'all'){
      tempRooms = tempRooms.filter(room => room.type  === type)
    }
    //Filtrer par capacité
    if(capacity !== 1){
        tempRooms = tempRooms.filter(room =>  room.capacity >= capacity);
    }

    //Filtrer par prix
    tempRooms = tempRooms.filter(room => room.price <= price);

    //Filter by size
    tempRooms = tempRooms.filter(room  => room.size >= minSize && room.size <= maxSize);

    //Filter by breakfast
    if(breakfast){
        tempRooms = tempRooms.filter(room  =>  room.breakfast == true);
    }

    //Filter by pets
    if(pets){
        tempRooms = tempRooms.filter(room  =>  room.pets == true);
    }

    //Modification du state
    this.setState({

        sortedRooms:tempRooms

    });

  };

  render () {
    return (
      <RoomContext.Provider value={{...this.state, getRoom:this.getRoom, handleChange:this.handleChange}}>
        {this.props.children}
      </RoomContext.Provider>);
  }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
      return (
        <RoomConsumer>
          {value => <Component {...props} context={value}/>}
        </RoomConsumer>);
  }
}

export {RoomProvider, RoomConsumer, RoomContext};
