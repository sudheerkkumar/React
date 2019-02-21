import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class ListContacts extends Component{

static  propTypes = {

    contacts: PropTypes.array.isRequired,
    onClickRemoveContact: PropTypes.func.isRequired
  }
  state = {
    query: ''
  }

queryEvent = (query) => {
  this.setState((previousState) => ({
    query :query.trim()
  }))
}

clearQuery = () => {
  this.queryEvent('')
}
  render(){
    const {query} = this.state
    const {contacts, onClickRemoveContact} = this.props


    const showingContacts = query === ''
    ? contacts
    : contacts.filter((c) => (
      c.name.toLowerCase().includes(query.toLowerCase())
    ))
    //console.log('props',this.props)
    return(
      <div className='contact-list'>
        <div className='contact-list-top'>
          <input className='search-contacts' type='text'
          placehodler='search contacts...'
          value={query}
           onChange={(event)=>this.queryEvent(event.target.value)} />
           <Link to='/create'
           className='add-contact'>CreateContact </Link>
        </div>
        {showingContacts.length != contacts.length && (
          <div className='showing-contacts'>
            <span>Showing contacts {showingContacts.length} of {contacts.length}
            <button onClick={this.clearQuery}>Show All</button>
            </span>
          </div>
        )}
        <ol className='contact-list'>
          {showingContacts.map((contact) => (
            <li key={contact.id} className = 'contact-list-item'>
            <div
              className='contact-avatar'
              style={{
                backgroundImage: `url(${contact.avatarURL})`
              }}>
            </div>
            <div className='contact-details'>
            {contact.name}
            <p className='contact-details'>{'@'+contact.id}</p>
            </div>
            <button
            onClick = {() => onClickRemoveContact(contact)}
            className='contact-remove'>
            </button>
            </li >
          ))}
        </ol>
      </div>
    )
  }
}

export default ListContacts
