import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { frontloadConnect } from 'react-frontload';
import Worlds from '../../components/pages/Worlds';
import { listWorlds } from '../../actions/graphql';

import type { State } from '../../types/State';

const mapStateToProps = ({graphql: {worlds}}: State) => ({
    worlds
});

const mapDispatchToProps = (dispatch: *) =>
    bindActionCreators({
        listWorlds
    }, dispatch);

const frontload = async props => {
    props.listWorlds();
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    frontloadConnect(frontload, {
        onUpdate: false
    })(Worlds)
);
