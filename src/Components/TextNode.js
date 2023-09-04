import React, { Component } from 'react';
import { Handle, Position } from 'reactflow';
import './TextNode.css';

class TextUpdaterNode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blockData: {
                value: '',
                name: '',
                type: 'text',
            },
        };
    }

    handleTypeChange = (evt) => {
        this.setState({
            blockData: {
                ...this.state.blockData,
                type: evt.target.value,
            },
        });
    };

    handleNameChange = (evt) => {
        this.setState({
            blockData: {
                ...this.state.blockData,
                name: evt.target.value,
            },
        });
    };

    handleValueChange = (evt) => {
        this.setState({
            blockData: {
                ...this.state.blockData,
                value: evt.target.value,
            },
        });
    };

    componentDidUpdate(prevProps) {
        if (this.props.data && prevProps.data !== this.props.data) {
            this.setState({
                blockData: this.props.data,
            });
        }
    }

    render() {
        
        const { isConnectable } = this.props;
        const { blockData } = this.state;

        return (
            <div className="accordion text-updater-node" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button
                            className="title accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                        >
                            Variable
                        </button>
                    </h2>
                    <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            <div>
                                <label htmlFor="type">Type:</label>
                                <select
                                    name="type"
                                    id="type"
                                    value={blockData.type}
                                    onChange={this.handleTypeChange}
                                >
                                    <option value="text">String</option>
                                    <option value="number">Number</option>
                                    <option value="boolean">Boolean</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={blockData.name}
                                    onChange={this.handleNameChange}
                                    className="nodrag"
                                />
                            </div>
                            <div>
                                <label htmlFor="value">Value:</label>
                                <input
                                    type={blockData.type}
                                    id="value"
                                    name="value"
                                    value={blockData.value}
                                    onChange={this.handleValueChange}
                                    className="nodrag"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Handle
                    type="source"
                    position={Position.Bottom}
                    id="a"
                    isConnectable={isConnectable}
                />
            </div>
        );
    }
}

export default TextUpdaterNode;
