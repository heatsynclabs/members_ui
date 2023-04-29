/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { CircularProgress, Paper } from '@mui/material';
import { edit, getOne } from '../state/events';
import FormInputText from '../components/form/FormInputText';
import FormInputDate from '../components/form/FormInputDate';
import Header from '../components/header';
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

// type FetchState = 'idle' | 'pending' | 'success' | 'error';

// function useFetch(fn) {
//   const [data, setData] = useState();

//   const [fetchState, setFetchState] = useState<FetchState>('idle');

//   const fetch = useCallback(() => {
//     fn().then(setData);
//   }, []);

//   return { data, fetch, isPending: fetchState === 'pending' };
// }

export default function EventEdit() {
  const params = useParams();
  const event = useSelector(({ events: { getOne: event } }) => event);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOne(params.event_id));
  }, [dispatch, params.event_id]);

  const methods = useForm({
    defaultValues: {
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      frequency: '',
      location: '',
    },
  });

  const { reset } = methods;

  useEffect(() => {
    reset(event);
  }, [event, reset]);

  const onSubmit = (updatedEvent) => {
    dispatch(edit(params.event_id, {
      name: updatedEvent.name,
      description: updatedEvent.description,
      start_date: updatedEvent.start_date,
      end_date: updatedEvent.end_date,
      location: updatedEvent.location,
      frequency: updatedEvent.frequency,
    }));
  };

  if (!event) {
    return <CircularProgress />;
  }

  return (
    <>
      <Header />
      <Paper>

        <FormProvider {...methods}>
          <form id="eventForm" onSubmit={methods.handleSubmit(onSubmit)}>
            <FormInputText name="name" label="Name" />
            <FormInputText name="description" label="Description" />
            <FormInputDate name="start_date" label="Start Date" />
            <FormInputDate name="end_date" label="End Date" />
            <FormInputText name="frequency" label="Frequency" />
            <FormInputText name="location" label="Location" />
          </form>
        </FormProvider>

        Hello
        <pre>{JSON.stringify(event, null, 2)}</pre>
        <button form="eventForm" type="submit">Submit</button>

        {/* <button type="button" onClick={reset(onSubmit)}>Reset</button> */}
      </Paper>
    </>
  );
}

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
