import React, {Component} from 'react'
import Darmanitan from '../../Darmanitan.png'
import axios from 'axios'
import toastr from 'toastr'
import {uploadPic, getUserPics} from '../../services/userService'
import Gallery from './Gallery';


class Profile extends Component{

    state = {
        user:{},
        pics:[]
    }

    componentWillMount(){
        const user = JSON.parse(localStorage.getItem('user'))
        if(!user) return this.props.history.push('/login')
        this.setState({user})
        //pedimos las fotos correspondientes al usuario
        this.getPics()
    }

    getPics = () => {
        getUserPics()
        .then(pics=>{
            this.setState({pics})
        })
        .catch(e=>toastr.error("no pude traer tus pics"))
    }


    getPrivateInfo = () => {
        axios.get('http://localhost:3000/private', {
            headers:{
                "Authorization" : localStorage.getItem('token') 
            }
        })
        .then(res=>{
            console.log(res)
        })
        .catch(e=>toastr.error("algo falló", e.message))
    }

    uploadPhoto = () => {
        this.refs.input.click()
    }

    onChangeFile = (e) => {
        console.log(e.target.files[0])
        uploadPic(e.target.files[0])
        .then(pic=>console.log(pic))
        .catch(e=>toastr.error('Error'))
    }

    render(){
        const {user, pics} = this.state
        return(
            <div>
                <div className="cabecera card-content ">
                <img style={{borderRadius:'50%'}} src={Darmanitan} width="200" alt="user"/>
                <img style={{cursor:"pointer"}} width="100" onClick={this.uploadPhoto} src="https://www.freeiconspng.com/uploads/upload-icon-32.png" alt="nueva"/>
                <h2>{user.username}</h2>
                <h5>{user.email}</h5>
                <input accept="image/*" onChange={this.onChangeFile} ref="input" hidden type="file" />
                <br/>
                </div>
                <Gallery className="card1" pics={pics} />
            </div>
        )
    }
}

export default Profile