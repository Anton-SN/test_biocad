import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import t from '../../../locales/t';
import styles from './SearchInput.module.css';

class SearchInput extends Component {
  static propTypes = {
    l: PropTypes.string.isRequired,
    choiceTool: PropTypes.func.isRequired,
    appliances: PropTypes.objectOf(
      PropTypes.arrayOf(
        PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
      ),
    ),
  };

  static defaultProps = {
    appliances: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      toolSelection: null,
    };
  }

  inputNumber = number => {
    this.setState({ toolSelection: number.target.value });
  };

  submitTool = e => {
    const { l, choiceTool, appliances } = this.props;
    e.preventDefault();
    const tool = appliances.appliances.filter(
      elem =>
        elem[l].tamENG === this.state.toolSelection ||
        elem[l].tamRU === this.state.toolSelection,
    )[0];
    choiceTool(tool);
    this.setState({ toolSelection: null });
    e.target.number.value = null;
  };

  render() {
    const { l, appliances } = this.props;
    const { toolSelection: tool } = this.state;
    // чтобы сработал поиск на рус и англ
    const appliancesrOptions = appliances.appliances.filter(
      e =>
        tool !== '' &&
        (e[l].tamENG.indexOf(tool) + 1 || e[l].tamRU.indexOf(tool) + 1),
    );

    const inputOPtions = appliancesrOptions.map(e => (
      <datalist id="numberOptions" key={e[l].tamRU + e[l].tamENG}>
        <option>{e[l].tamENG}</option>
        <option>{e[l].tamRU}</option>
      </datalist>
    ));
    return (
      <div className={styles.search}>
        <label className={styles.caption} htmlFor="number">
          {t('search.inputNumber', l)}
        </label>
        <form action="" onSubmit={this.submitTool}>
          <input
            id="number"
            className={styles.input__text}
            type="text"
            onChange={this.inputNumber}
            list="numberOptions"
            name="number"
          />
          <datalist id="numberOptions">{inputOPtions}</datalist>
          <button
            className={`${styles.input__btn} ${
              String(this.state.toolSelection).length === 8
                ? styles.input__btn__ready
                : null
            }`}
            disabled={!(String(this.state.toolSelection).length === 8)}
          >
            {t('button.search', l)}
          </button>
        </form>
      </div>
    );
  }
}

const mapState = state => ({
  l: state.language.language,
});

export default connect(mapState)(SearchInput);
