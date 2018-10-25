import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import Home from '../components/Home';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: *) =>
    bindActionCreators({}, dispatch);

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Home)
);
