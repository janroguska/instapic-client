import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NavBar from '../components/NavBar'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import Snackbar from '@material-ui/core/Snackbar'
import {
  getAllPosts,
  submitNewPost,
  uploadSuccess,
  uploadFailure
} from '../store/actions/postActions'
import { getAllUsers } from '../store/actions/userActions'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      post: {
        file: null,
        uploadCaption: ''
      },
      params: {
        user: '',
        sort_by: 'newest',
        page: 1
      }
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handlePost = this.handlePost.bind(this)
    this.handleFile = this.handleFile.bind(this)
    this.handleParams = this.handleParams.bind(this)
  }

  componentDidMount = () => {
    if (!this.props.loginSuccess) this.props.history.push('/login')
    this.props.posts({
      params: this.state.params,
      token: this.props.userToken
    })
    this.props.getUsers({
      token: this.props.userToken
    })
    this.props.resetPostState(false)
    this.props.resetPostError(false)
  }

  componentDidUpdate = () => {
    if (!this.props.loginSuccess) this.props.history.push('/login')
    if (this.props.uploadSuccess) {
      this.props.posts({
        params: this.state.params,
        token: this.props.userToken
      })
    }
  }

  handleOpen = () => {
    this.setState({
      open: true
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  handlePost = (name) => (event) => {
    const { post } = this.state
    const updatedPost = {
      ...post,
      [name]: event.target.value
    }
    this.setState({
      post: updatedPost
    })
  }

  handleParams = (name) => (event) => {
    const { params } = this.state
    const updatedParams = {
      ...params,
      [name]: event.target.value,
      page: 1
    }
    this.setState({
      params: updatedParams
    })
    this.props.posts({
      params: updatedParams,
      token: this.props.userToken
    })
  }

  incrementPage = async () => {
    const { params } = this.state
    const updatedParams = {
      ...params,
      page: params.page + 1
    }
    this.setState({
      params: updatedParams
    })
    this.props.posts({
      params: updatedParams,
      token: this.props.userToken
    })
    window.scrollTo(0, 0)
  }

  decrementPage = async () => {
    const { params } = this.state
    const updatedParams = {
      ...params,
      page: params.page - 1
    }
    this.setState({
      params: updatedParams
    })
    this.props.posts({
      params: updatedParams,
      token: this.props.userToken
    })
    window.scrollTo(0, 0)
  }

  handleFile = (name) => (event) => {
    const { post } = this.state
    const updatedPost = {
      ...post,
      [name]: event.target.files[0]
    }
    console.log(updatedPost)
    this.setState({
      post: updatedPost
    })
  }

  submitForm = () => {
    this.handleClose()
    this.props.newPost(this.state.post, this.props.userToken)
  }

  closeSnackbarSuccess = () => {
    this.props.resetPostState(false)
  }

  closeSnackbarFailure = () => {
    this.props.resetPostError(false)
  }

  render() {
    const disabled = !this.state.post.file

    return(
      <>
        <NavBar />
        <Container maxWidth="md">
          <Snackbar
            open={this.props.uploadFailure}
            autoHideDuration={6000}
            onClose={this.closeSnackbarFailure}
            message="There was a problem with your post."
          />
          <Snackbar
            open={this.props.uploadSuccess}
            autoHideDuration={6000}
            onClose={this.closeSnackbarSuccess}
            message="Post uploaded."
          />
          <Modal
            open={this.state.open}
            onClose={this.handleClose}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={this.state.open}>
              <Card style={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent style={{  flexGrow: 1 }}>
                  <Button
                    value={this.state.post.file}
                    onChange={this.handleFile('file')}
                    type="submit"
                    fullWidth
                    variant="contained"
                    component="label"
                    color="primary"
                    size="large"
                  >
                    Upload Picture
                    <input
                      type="file"
                      style={{ display: "none" }}
                      accept=".jpg,.png,.jpeg,.gif"
                    />
                  </Button>
                  <TextField
                    value={this.state.post.uploadCaption}
                    inputProps={{ maxLength: 140 }}
                    onChange={this.handlePost('uploadCaption')}
                    required
                    fullWidth
                    label="Add Caption"
                    autoFocus
                  />
                  <Button
                    disabled={disabled}
                    onClick={this.submitForm}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    size="large"
                  >
                    Post
                  </Button>
                </CardContent>
              </Card>
            </Fade>
          </Modal>
          <Grid container spacing={4}>
            <Grid item xs={5}>
              <InputLabel htmlFor="outlined-age-native-simple">User</InputLabel>
              <Select
                variant="outlined"
                native
                fullWidth
                value={this.state.params.user}
                onChange={this.handleParams('user')}
                label="User"
              >
                <option value={''}>All Users</option>
                {this.props.userList.map((user, index) => (
                  <option key={index} value={user.username}>{user.username}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={5}>
              <InputLabel htmlFor="outlined-age-native-simple">Sort By</InputLabel>
              <Select
                variant="outlined"
                native
                value={this.state.params.sort_by}
                onChange={this.handleParams('sort_by')}
                label="Sort By"
              >
                <option value={'newest'}>Newest</option>
                <option value={'oldest'}>Oldest</option>
                <option value={'user'}>User</option>
              </Select>
            </Grid>
            <Grid item xs={2}>
              <Fab
                size="large"
                color="primary"
                onClick={this.handleOpen}
              >
                <AddOutlinedIcon />
              </Fab>
            </Grid>
          </Grid>
          <Grid container spacing={4} justify="center">
            {this.props.userPosts.map((post) => (
              <Grid item key={post.image} xs={12} sm={6} md={4}>
                <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    style={{ paddingTop: '100%' }}
                    image={`${process.env.REACT_APP_BASE_URL}/post/${post.image}`}
                    title={post.owner}
                  />
                  <CardContent style={{  flexGrow: 1 }}>
                    <Typography noWrap>
                      { post.caption }
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Grid
            container
            justify="center"
            style={{ display: 'flex', flexDirection: 'row' }}
          >
            <Fab
              onClick={this.decrementPage}
              disabled={this.state.params.page < 2}
              color="primary"
              size="large"
            >
              <ArrowBackIosIcon />
            </Fab>
            <Fab color="primary" disabled>{ this.state.params.page }</Fab>
            <Fab
              onClick={this.incrementPage}
              disabled={this.props.userPosts.length < 18}
              color="primary"
              size="large"
            >
              <ArrowForwardIosIcon />
            </Fab>
          </Grid>
        </Container>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userToken: state.userToken,
    username: state.username,
    userPosts: state.posts,
    uploadSuccess: state.uploadSuccess,
    uploadFailure: state.uploadFailure,
    userList: state.userList,
    loginSuccess: state.loginSuccess
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    posts: (data) => dispatch(getAllPosts(data)),
    newPost: (data, token) => dispatch(submitNewPost(data, token)),
    resetPostState: (data) => dispatch(uploadSuccess(data)),
    resetPostError: (data) => dispatch(uploadFailure(data)),
    getUsers: (data) => dispatch(getAllUsers(data))
  }
}

Home.propTypes = {
  uploadFailure: PropTypes.bool,
  history: PropTypes.object,
  register: PropTypes.func,
  uploadSuccess: PropTypes.func,
  registrationError: PropTypes.bool,
  userList: PropTypes.array,
  userPosts: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)