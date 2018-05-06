import React from 'react';

const createForm = (Comp) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.instances = [];
            this.add = this.add.bind(this);
            console.log(this);
        }

        add(name, e) {
            if (this.instances.some(x => x.name == name)) {
                return;
            }
            this.instances.push({ name: name, input: e });
        }

        addInstance(name, inputComp) {
            let newInputComp = Object.assign({}, inputComp, { ref: e => { this.add(name, e) } });
            return newInputComp;
        }

        onVerification() {
            return this.instances.filter(item => {
                return !item.input.check().status;
            }).map(item => {
                return item.input.check()
            })
        }

        render() {
            return <Comp addInstance={this.addInstance.bind(this)} onVerification={this.onVerification.bind(this)} >
            </Comp>
        }
    }
}

export default class VForm extends React.Component {
    constructor(props) {
        super(props);
    }

    static setCreate(comp) {
        return createForm(comp);
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}