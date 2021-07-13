import React, {Component}  from 'react';
import CardList from '../MyComponents/CardList';
import Scroll from '../MyComponents/Scroll';
import Navbar from '../MyComponents/Navigation/Navigation';
import Loader from './loader';
import './styles.css';
class App extends Component{

    constructor(){
        super()
        this.state={
            robots: [],
            searchfeild: '',
            isButtonClicked: false
        }
    }

     
  
    onButtonSubmit = () => {
        this.setState({isButtonClicked: !this.isButtonClicked})
        const timer = setTimeout(() => {
            fetch('https://reqres.in/api/users?page=1').then(response=> {
            return response.json();
            })
            .then(users=>{
                this.setState({robots: users.data})
            });
        }, 3000);
        return () =>clearTimeout(timer);
    }

    onSearchChange = (event) => {
        this.setState({searchfeild: event.target.value})
    }

    render(){

      
        const filteredRobots = this.state.robots.filter(robots=>{
            return robots.first_name.toLowerCase().includes(this.state.searchfeild.toLowerCase());
        })

      
        if(this.state.robots.length === 0 && this.state.isButtonClicked === false){
            return (
              <>
                <Navbar onButtonSubmit={this.onButtonSubmit}/>
                <h1 className='h'>Please click on GET USERS Button to fetch the user details</h1>
                <footer className='copyapp' >Copyright &copy; Developed and Developed by Udaya Rajasekhar</footer>
              </>
            );

        }

    
        else if(this.state.robots.length === 0){
            return (
                <>
                  <Navbar onButtonSubmit={this.onButtonSubmit}/>
                  <h1 className='tc b'>Loading...</h1>
                  <Loader className='loader'></Loader>
                </>
              );
        }

        
        else{
            return(
                <>
                  <Navbar onButtonSubmit={this.onButtonSubmit}/>
                  <div className='tc'>
                      <h1 className='a'>Users Information</h1>
                      
                      <Scroll>
                        <CardList robots={filteredRobots}/>
                      </Scroll>

                  </div>
                 </>
              );
        }

    }

}

export default App;