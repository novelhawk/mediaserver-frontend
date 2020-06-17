import React from 'react';
import { withRouter } from 'next/router';

// export default function Works() {
//     return <pre>Works</pre>;
// }
class Test extends React.Component {
    render() {
        return <pre>{this.props.router.query.shortName}</pre>;
    }
}

export default withRouter(Test);
