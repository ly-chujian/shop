
import React from 'react';

export const ErrorBoundary = (Comp)=> {
    return class extends React.Component{
        constructor(props) {
            super(props);
            this.state = { error: null, errorInfo: null };
        }

        //Comp渲染的时候执行，compInstance为Comp的实例
        proc(compInstance) {
            // compInstance.getData();
        }

        componentDidCatch(error, errorInfo) {
            this.setState({
              error: error,
              errorInfo: errorInfo
            })
            // You can also log error messages to an error reporting service here
            //logErrorToService(error,errorInfo);
          }

        render(){
            // debugger
            const props = Object.assign({}, this.props, {ref: this.proc.bind(this)});
            // const data = this.getData();
            if (this.state.errorInfo) {
                return (
                    <div>
                    <h2>Something went wrong.</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                    </div>
                );
            }
            return (
                <Comp {...props} />
            )
        }
    }
}