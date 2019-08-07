import { frontloadConnect } from 'react-frontload';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { loadShelves } from '../../actions/load';
import Shelves from '../../components/pages/Shelves';
import { Action } from '../../types/Action';
import { ShelvesPageProps } from '../../types/Props/Pages/Shelves';
import { State } from '../../types/State';

const mapStateToProps = ({ goodreads: { shelves } }: State) => ({
    shelves
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
    bindActionCreators(
        {
            loadShelves
        },
        dispatch
    );

const frontload = async (props: ShelvesPageProps) => {
    props.loadShelves();
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    frontloadConnect(frontload, {
        onUpdate: false
    })(Shelves)
);
