import React from 'react';
import {useContext} from 'react';
import {RoomContext} from '../context';
import Title from '../components/Title';

//get all unique values

const getUnique =(items,value) => {

  return [...new Set(items.map(item => item[value]))];

}

export default function RoomsFilter({rooms}) {

  //Récupération de l'objet en entier Data
  const context = useContext(RoomContext);

  const {
    handleChange,type,capacity, price, minPrice,maxPrice,minSize,maxSize,breakfast,pets
  } = context ;

  //get unique types of items without repeat
  let types = getUnique(rooms,'type');

  //add all types

   types = ['all', ...types];

  //map to jsx and convert data to an option value
  //Récupération final dans le select balise

   types = types.map((item, index) =>{
    return (
              <option value={item} key={index}>
                {item}
              </option>
            );
  });

  //Récupérer les données des personnes soit la capacité de la chambre

  let people = getUnique(rooms, 'capacity');

  people = people.map((item, index)=>{

      return <option key={index} value={item}>{item}</option>
  });

  return (
    <section className="filter-container">
      <Title title="Search Rooms"/>
      <form className='filter-form'>
        {/*Select Type*/}
        <div className="form-group">
          <label htmlFor="type">Type of room</label>
          <select
            name="type"
            id="type"
            value={type}
            className="form-control"
            onChange={handleChange}>
            {types}
          </select>
        </div>
        {/*End Select Type*/}

        {/*Guests Select*/}
        <div className="form-group">
          <label htmlFor="capacity">Guests</label>
          <select
            name="capacity"
            id="capacity"
            value={capacity}
            className="form-control"
            onChange={handleChange}>
            {people}
          </select>
        </div>
        {/*End Select Guests*/}

        {/*Room price*/}
        <div className='form-group'>
          <label htmlFor="price">Room price {price}Dh</label>
          <input
            type="range"
            name="price"
            min={minPrice}
            max={maxPrice}
            id="price"
            value={price}
            onChange={handleChange}
            className="form-control"/>
        </div>
        {/*End Room price */}

        {/*Room size*/}
        <div className='form-group'>
          <label htmlFor="size">Room size</label>
          <div className="size-inputs">
            <input
              type="number"
              name="minSize"
              id="size"
              value={minSize}
              onChange={handleChange}
              className="size-input"
            />
            <input
              type="number"
              name="maxSize"
              id="size"
              value={maxSize}
              onChange={handleChange}
              className="size-input"
            />
          </div>
        </div>
        {/*End of size */}

        {/*Extras */}
        <div className="form-group">
          <div className="single-extra">
            <input
              type="checkbox"
              name="breakfast"
              checked={breakfast}
              onChange={handleChange}
              id="breakfast" />
            <label htmlFor="breakfast">Breakfast</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="pets"
              checked={pets}
              onChange={handleChange}
              id="pets" />
            <label htmlFor="pets">Pets</label>
          </div>
        </div>
        {/*End of Extras*/}
      </form>
    </section>
  );
}
