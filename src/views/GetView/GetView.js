import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { DataGrid, GridActionsCellItem, GridToolbarContainer } from '@mui/x-data-grid'
import VisibilityIcon from '@mui/icons-material/Visibility';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Fade from "@mui/material/Fade";
import { Modal, TextField, Typography, Container } from '@mui/material';





class EditToolbar extends React.Component {
  handleClick = () => {
   
    this.props.onCustomAction()
    
  };

  render() {
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={this.handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>
    );
  }
}


class GetView extends Component {

  constructor() {

    super();
    this.state = {
      alertVisibility: false,
      data: [],
      rowModesModel: {},
      title: '',
      body: '',

      manageModal: false,
      columns: [
        {
          field: 'id',
          headerName: 'ID',
          editable: false,
          flex: 0.2,
          minWidth: 50,
        },
        {
          field: 'title',
          headerName: 'Title',

          editable: false,
          flex: 2,
          minWidth: 200,
        },
        {
          field: 'body',
          headerName: 'Body',
          flex: 2,
          minWidth: 200,
          editable: false,

        },
        {
          field: 'actions',
          type: 'actions',
          headerName: 'Actions',
          flex: 0.3,
          minWidth: 60,
          cellClassName: 'actions',
          getActions: (params) => {
            return [
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => this.handleDelete(params)}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<VisibilityIcon />}
                label="View"
                onClick={() => this.handleChangeView(params)}
                color="inherit"
              />,
            ];
          },
        },

      ]
    };
  }


  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const jsonData = await response.json();
      this.setState({ data: jsonData });
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  handleChangeView = (params) => {
    const aux = { id: params.id };
    this.props.history.push('/detailview/', aux);
  }

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  handleBodyChange = (event) => {
    this.setState({ body: event.target.value });
  };

  handleOpenCloseModal = () => {
    this.setState({ manageModal: !this.state.manageModal,title:'',body:'' });
    
  };

  handleSubmit = async () => {
    const { title, body } = this.state;

    console.log('Title:', title);
    console.log('Body:', body);

    let aux = {
      title: title,
      body: body,
    }

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(aux),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.setState({ data: [...this.state.data, data] })

    } catch (error) {
      console.error('Error:', error);
    }
    this.setState({ alertVisibility: true })
    this.handleOpenCloseModal()
  };

  handleDelete = (params) => {
    const id = params.id
    console.log(params.id)
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        this.setState({ alertVisibility: true })
        console.log("Delete successful");
        this.setState((prevState) => ({
          data: prevState.data.filter(item => item.id !== id)
        }));

      })
      .catch(error => {
        console.error("There was a problem with the delete request:", error.message);
      });
  };


  render() {
    const { data, alertVisibility } = this.state;

    return (
      <>
        <Fade
          in={alertVisibility}
          timeout={{ enter: 1000, exit: 1000 }}
          addEndListener={() => {
            setTimeout(() => {
              this.setState({ alertVisibility: false });
            }, 1000);

          }}
        > 
          <Alert severity="success" variant="standard" className="alert">
            <AlertTitle>Delete Success !</AlertTitle>
          </Alert>
        </Fade>
        <div style={{ width: '100%' }}>
          <DataGrid
            rows={data}
            columns={this.state.columns}
            slots={{
              toolbar: (props) => <EditToolbar {...props} onCustomAction={this.handleOpenCloseModal} />,
            }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
          />
        </div>


        <Modal open={this.state.manageModal}>
          <Container>
            <Box sx={{ mt: 4, p: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Post Form
              </Typography>
              <form>
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  margin="normal"
                  value={this.state.title}
                  onChange={this.handleTitleChange}
                />
                <TextField
                  fullWidth
                  label="Body"
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={2}
                  value={this.state.body}
                  onChange={this.handleBodyChange}
                />
                <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                  Send
                </Button>
              </form>
            </Box>
          </Container>
        </Modal>

      </>
    );
  }
}

export default GetView