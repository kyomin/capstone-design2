import React from 'react';

export default class MakeFileList extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            fileList: this.props.fileList
        };
    }

    componentDidMount = () => {
        console.log(this.state.fileList);
    }

    render()
    {
        return this.state.fileList.map((item, idx) => {
            return (
                <tr key={idx}>
                    <td>
                        <div className="file_list_accordian">
                            <div className="file_list_wrap">
                                <div className="subject">
                                {item.fileName}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className="file_list_accordian">
                            <div className="file_list_wrap">
                                <div className="subject">
                                {item.fileType}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className="file_list_accordian">
                            <div className="file_list_wrap">
                                <div className="subject">
                                {item.fileSize}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className="file_list_accordian">
                            <div className="file_list_wrap">
                                <div className="subject">
                                {item.submitTime}
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            )
        })
        
        
    }
}
