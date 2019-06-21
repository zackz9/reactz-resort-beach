import React from 'react'
import defaultBcg from '../images/room-1.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import {RoomContext} from '../context';
import StyledHero from '../components/StyledHero';


class SingleRoom extends React.Component {
//Récupération des données pour un seul article
  constructor(props){
    super(props)
      this.state = {
        slug:this.props.match.params.slug,
        defaultBcg
      };
  }

  static contextType = RoomContext;

  componentDidMount(){

  }


  render () {
    //Déclaration de la constante de l'article(objet)
    const {getRoom} = this.context;
    //Recup de l'article par son slug pour conserver le routing, ex cherches avec n'importe quel slug introuvable et résultat sera indéfini
    const room = getRoom(this.state.slug);

    if(!room) {
      return (
          <div className="error">
            <h3>Error message : No such room could be found...</h3>
            <Link to='/' className='btn-primary'>Back to home</Link>
        </div>
      );
    }

    const {
      name,
      description,
      capacity,
      size,
      price,
      extras,
      breakfast,
      pets,
      images
    } = room;

    const [mainImg,...defaultImg]= images;
    console.log(defaultImg);


      return (
        <>
        <StyledHero img={mainImg || this.state.defaultBcg}>
          <Banner title={`${name} room`}>
            <Link
              to='/rooms'
              className='btn-primary'>Back to rooms</Link>
          </Banner>
        </StyledHero>
        <section className="single-room">
          <div className="single-room-images">
            {defaultImg.map((item, index)=>{

              return  <img key={index} src={item} alt={name}/>;

            })}
          </div>
          <div className="single-room-info">
            <article className="desc">
              <h3>Details</h3>
              <p>{description}</p>
            </article>
            <article className="info">
              <h3>Informations</h3>
              <h6>Price : {price} Dh</h6>
              <h6>Size : {size} Sqft</h6>
              <h6>Max-capacity : {capacity > 1 ? `${capacity} people` : `${capacity} person `}</h6>
              <h6>{pets ? "Pets allowed" :"No pets allowed"}</h6>
              <h6>{breakfast && "Free breakfast included"}</h6>
            </article>
          </div>
        </section>
        <section className="room-extras">
          <h6>Extras</h6>
          <ul className="extras">
            {extras.map((item, index) =>{
              return <li key={index}>- {item}</li>;
            })}
          </ul>
        </section>
        </>
      );
  }
}

export default SingleRoom;
