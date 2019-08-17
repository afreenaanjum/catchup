import React from 'react'
import axios from '../config/axios'
import Input from '../common/input'
import Button from '../common/button'

class Register extends React.Component{
    constructor(){
        super()
        this.state = {
            username: '',
            email: '',
            password: '',
            errMsg: '',
            sucessMsg: ''
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleChange(e){
        e.persist()
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault()
        const formData = {
            username:this.state.username,
            email:this.state.email,
            password:this.state.password
        }
        axios.post('catchup/register',formData)
             .then(response =>{
                 if(response.data.hasOwnProperty('errors')){
                     this.setState({
                         errorMsg:response.data.message
                     })
                 }else{
                     this.setState({
                         successMsg:'successfully registered',
                         username:'',
                         email:'',
                         password:'',
                         errorMsg:'',
                         

                     })
                 }
             })
             .catch(err =>{
                 console.log(err)
             })
    }

    
    render(){
        return(
            <div className="card">
                <h2>Register</h2>
                {this.state.errorMsg && <p>{this.state.errorMsg}</p>}
                {this.state.successMsg && <p>{this.state.successMsg}</p>}
                <form onSubmit={this.handleSubmit}>    
                    <Input 
                        type="text" 
                        name="username" 
                        value={this.state.username} 
                        onChange={this.handleChange} 
                        placeholder="Username"
                    />
                    <br/>
                    <Input 
                        type='email' 
                        value={this.state.email} 
                        onChange={this.handleChange} 
                        name='email' 
                        placeholder="Email"
                    />
                    <br/>
                    <Input 
                        type='password' 
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        name='password' 
                        placeholder="Password"
                    />
                    <br/>
                    <Button type='submit' text='Register' />
                </form>
            </div>
        )
    }


}

export default Register