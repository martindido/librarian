import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { signOut } from '../../actions/auth';
import { goodreadsSignOut } from '../../actions/goodreads';
import SignOut from '../../components/auth/SignOut';
import { Action } from '../../types/Action';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
    bindActionCreators(
        {
            signOut,
            goodreadsSignOut
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignOut);
