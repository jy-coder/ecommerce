import React,{Component} from 'react'
import {connect} from 'react-redux'

class ErrorBoundary extends Component{
    
    render(){
        const {error} = this.props.errorData
        if(error)
            return <div> Something went wrong! Please try again later!</div>
        return this.props.children
        
    }
}

const mapStateToProps = (state) => ({
    data: state.data,
    errorData:state.error
  });

  export default connect(mapStateToProps)(ErrorBoundary);

