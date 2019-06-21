import React, {Component} from 'react';
import {FaCocktail, FaHiking, FaShuttleVan, FaBeer} from 'react-icons/fa';
import Title from './Title';


class Services extends React.Component {

  state= {
      services:[
        {
          icon:<FaCocktail/>,
          title:"Free Cocktails",
          info:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus."
        },
        {
          icon:<FaHiking/>,
          title:"Endless Hiking",
          info:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus."
        },
        {
          icon:<FaShuttleVan/>,
          title:"Free shuttle",
          info:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus."
        },
        {
          icon:<FaBeer/>,
          title:"Strongest Beer",
          info:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus."
        }
      ]
  }

  render () {
    return(
      <section className="services">
        <Title title="services">
        </Title>
        <div className="services-center">
          {this.state.services.map((item, index)=>{
            return (
            <article className="service" key={index}>
              <span>{item.icon}</span>
              <h6>{item.title}</h6>
              <p>{item.info}</p>
            </article>);
          })}
        </div>
      </section>
    )
  }
}

export default Services;
