import React, { Component } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";

class DetailView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isEditing: false,
      dataComments: [],
      id: '',

      editedData: {
        title: '',
        body: '',
      },
      columns: [
        {
          field: 'id',
          headerName: 'id',
          editable: false,
          flex: 0.2,
          minWidth: 50,
        },
        {
          field: 'name',
          headerName: 'name',
          editable: false,
          flex: 1,
          minWidth: 150,
        },
        {
          field: 'email',
          headerName: 'email',
          editable: false,
          flex: 1,
          minWidth: 150,
        },
        {
          field: 'body',
          headerName: 'Body',
          flex: 2,
          minWidth: 200,
          editable: false,
        },

      ]
    };
  }

  toggleEdit = () => {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing,
      editedData: { ...prevState.data }, 
    }));
  };

  async componentDidMount() {

    await this.setState({ id: this.props.location.state.id })

    this.fetchData();
    this.fetchComments();
  }

  fetchComments = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/' + this.state.id + '/comments');
      const jsonData = await response.json();

      this.setState({ dataComments: jsonData });
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/' + this.state.id);
      const jsonData = await response.json();

      this.setState({ data: jsonData });
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  handleSave = async() => {
    this.setState((prevState) => ({
      isEditing: false,
      data: { ...prevState.editedData },
    }));

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.editedData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response:', data);
    } catch (error) {
      console.error('Error:', error);
    }





  };

  handleChange = (field, value) => {
    this.setState((prevState) => ({
      editedData: {
        ...prevState.editedData,
        [field]: value,
      },
    }));
  };


  render() {

    const { isEditing, data, editedData } = this.state;

    return (
      <>
        <Card>
        <CardMedia sx={{ height: 140 }} image="https://picsum.photos/2300/200" title="random image" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {isEditing ? (
                <TextField
                fullWidth
                label="Title"
                variant="outlined"
                margin="normal"
                value={editedData.title}
                onChange={(e) => this.handleChange('title', e.target.value)}
              />
            ) : (
              data.title
            )}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {isEditing ? (
              <TextField
              fullWidth
              label="Body"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              value={editedData.body}
              onChange={(e) => this.handleChange('body', e.target.value)}
            />
            ) : (
              data.body
            )}
          </Typography>
          <br></br>
          {isEditing ? (
            <Button onClick={this.handleSave} variant="contained" color="primary">
              Save
            </Button>
          ) : (
            <Button onClick={this.toggleEdit} variant="contained" color="primary">
              Edit
            </Button>
          )}
        </CardContent>
      </Card>
        <br></br>
        <div style={{ width: '100%' }}>
          <DataGrid
            rows={this.state.dataComments}
            columns={this.state.columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </>

    );
  }
}

export default DetailView;