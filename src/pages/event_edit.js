import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function useEvents() {
  return useSelector(({ events }) => events);
}

// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import { DataGrid } from '@material-ui/data-grid';
// import Header from '../components/header';
// import { read, edit, add } from '../state/events';

// const styles = {
//   eventDescription: {
//     whiteSpace: 'pre-line',
//   },
//   tableContainer: {
//     // margin: '10px',
//   },
//   gridContainer: {
//     width: '100%',
//     display: 'flex',
//     height: 450,
//   },
//   nameField: {
//     fontSize: '1.5em',
//     magin: '5px',
//   },
//   descriptionFeild: {
//     width: '125ch',
//     magin: '5px',
//   },
//   form: {
//     width: '90%',
//     margin: '5px',
//   },
//   formButton: {
//     margin: '5px',
//   },
// };

function useFetch(fn) {
  const [data, setData] = useState();

  const fetch = useCallback(() => {
    fn().then(setData);
  }, []);

  return { data, fetch };
}

function EventEdit(props) {
  const params = useParams();
  const events = useEvents();

  const handleFetchRaw = useCallback(() => {
    debugger;
    return events?.read(params.event_id);
  }, []);

  const { data, fetch } = useFetch(handleFetchRaw);
  const handleClick = useCallback(() => {
    fetch();
  }, []);

  return (
    <>
      Hello
      <pre>{JSON.stringify({ data, params }, null, 2)}</pre>
      <button type="button" onClick={handleClick}>Fetch</button>
    </>
  );
}

export default EventEdit;

// class Events extends Component {
//   state = {
//     name: '',
//     frequency: '',
//     location: '',
//     description: '',
//     start_date: '',
//     end_date: ''
//   };

//   nameChange = (e) => {
//     this.setState({name: e.target.value});
//   };

//   frequencyChange = (e) => {
//     this.setState({frequency: e.target.value});
//   };

//   locationChange = (e) => {
//     this.setState({location: e.target.value});
//   };

//   descriptionChange = (e) => {
//     this.setState({description: e.target.value});
//   };

//   startDateChange = (e) => {
//     this.setState({start_date: e.target.value});
//   };

//   endDateChange = (e) => {
//     this.setState({end_date: e.target.value});
//   };

//   submitForm = () => {
//     const { event_id } = this.props.match.params;
//     const { name, frequency, description } = this.state;
//     this.props.edit(event_id, { name, frequency, description });
//   };

//   async componentDidMount(){
//     const { event_id } = this.props.match.params;
//     const { id, name, frequency, location, description, start_date, end_date } = await this.props.read(event_id);
//     this.setState({ id, name, frequency, location, description, start_date, end_date });
//   }

//   render() {

//     const { read } = this.props.events;
//     const { auth } = this.props.user;
//     return (
//         <div style={styles.container}>
//           <Header/>
//           {auth.isAdmin && read ? (
//             <div style={styles.form}>
//               <TextField
//                 label="Name"
//                 style={styles.nameField}
//                 value={this.state.name}
//                 onChange={this.nameChange}
//               />
//               <br/>
//               <TextField
//                 label="Frequency"
//                 style={styles.frequencyField}
//                 value={this.state.frequency}
//                 onChange={this.frequencyChange}
//               />
//               <br/>
//               <TextField
//                 label="Location"
//                 style={styles.locationField}
//                 value={this.state.location}
//                 onChange={this.locationChange}
//               />
//               <br/>
//               <TextField
//                 label="Description"
//                 fullWidth
//                 multiline
//                 style={styles.nameField}
//                 value={this.state.description}
//                 onChange={this.descriptionChange}
//               />
//               <TextField
//                 label="Start Date"
//                 style={styles.startDateField}
//                 value={this.state.start_date}
//                 onChange={this.startDateChange}
//               />
//               <TextField
//                 label="End Date"
//                 style={styles.endDateField}
//                 value={this.state.end_date}
//                 onChange={this.endDateChange}
//               />
//               <br/>
//               <Button
//                 style={styles.formButton}
//                 variant="contained"
//                 color="primary"
//                 onClick={this.submitForm}
//               >
//                 Update
//               </Button>
//               <Link to={`/events/${this.state.id}`}>Back</Link>
//             </div>
//           ) : (
//             <>
//               <h1>{read ? read.name : ''}</h1>
//               <h2>{read ? read.description : ''}</h2>
//             </>
//           )}

//         </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   const { events } = state;
//   return { events };
// }

// export default connect(mapStateToProps, { read, edit, add })(Events);
