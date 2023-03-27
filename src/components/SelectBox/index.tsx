import React from 'react';

interface Props {
  label: string;
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
    const { label } = this.props;
    const { options } = this.props;
    const { selectedOption } = this.state;
  // 下の意味なしdivは、カスタム矢印を設定しようとして諦めた形跡
    return (
      <div className="">
        <label className="block text-zinc-600 text-xs">{label}</label>
          <div className="">
            <select className="block text-zinc-600 text-base w-80 h-8 bg-white" value={selectedOption ? selectedOption : ''} onChange={this.handleOptionChange}>
              <option value="">選択してください</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
      </div>
    );
  }
  
}

export default SelectBox;
