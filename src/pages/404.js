import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import styles from '../assets/css/NotFound.less';

class NotFound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      routes: [],
    };
  }

  componentDidMount() {
    console.log(this.props)
    // fetch('/__umiDev/routes')
    //   .then(res => res.json())
    //   .then(routes => {
    //     this.setState({
    //       loading: false,
    //       routes,
    //     });
    //   });
  }

  render() {
    const { location } = this.props;
    return (
      <div className={styles.wrapper}>
        <h1>404 page</h1>
        <p>
          There's not a page yet at <code>{location.pathname}</code>.
        </p>
        <p>
          There are something wrong in this page
        </p>
        <h2>go to home Page</h2>
        <ul className={styles.ul}>
          <li>
            <Link to={'/home'}>HOME</Link>
          </li>
        </ul>

      </div>
    );
  }
}

export default withRouter(NotFound);
