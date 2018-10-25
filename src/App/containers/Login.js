import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from '../components/Login';
import {
    login
} from '../actions/auth';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: *) =>
    bindActionCreators({
        login
    }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
