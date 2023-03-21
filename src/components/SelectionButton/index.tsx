import React from 'react';

interface Props {
  options: string[]; // 外部から渡される選択肢
}

interface State {
  selectedOption: string | null; // 選択された選択肢
}

class SelectBox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedOption: null,
    };
  }

  handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    this.setState({ selectedOption });
  };

  render() {
    const { options } = this.props;
    const { selectedOption } = this.state;

    return (
      <select value={selectedOption} onChange={this.handleOptionChange}>
        <option value="">選択してください</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
}

export default SelectBox;
