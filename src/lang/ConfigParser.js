import config from './faust.config'
import FuncData from './FuncData';

export class ConfigParser {
    constructor(callback) {
        this.code = '';
        this.token = '\0';
        this.tokenIndex = -1;
        this.tempData = new FuncData('', [], ''); 
        this.functions = [];
        
        
        
    }

    async load() {
        await fetch(config)
            .then(r => r.text())
            .then(text => {
                this.code = text;
                this.process();
            });
    }

    async process() {
        
        this.advance(); // start out the parsing

        while (this.token !== '\0') {
            if (this.token === '\r' || this.token === '\n') {
                this.advance();
                continue;
            }
            this.name();
            this.lineEnd();

            this.functions.push(this.tempData);
            this.tempData = new FuncData('', [], '');
        }

        console.table(this.functions);
        return this.functions;
    }

    async parse() {
        await this.load();
    }

    name() {
        while ([' ', '\r', '\n', '\0'].includes(this.token) === false) {
            this.tempData.name += this.token;
            this.advance();
        }

        if (this.token === ' ') {
            this.advance();
            this.args();
        } else {
            console.error('No Args??');
        }
    }

    args() {
        this.tempArg = '';

        while(['$', '\r', '\n', '\0'].includes(this.token) === false) {
            if (this.token === ' ') {
                this.tempData.paramNames.push(this.tempArg);
                this.tempArg = '';
            } 
            else {
                this.tempArg += this.token;
            }
            this.advance();
        }

        if (this.token === '$') {
            this.advance();
            this.cat();
        }
    }

    cat() {
        while ([' ', '\r', '\n', '\0'].includes(this.token) === false) {
            this.tempData.category += this.token;
            this.advance();
        }
    }

    advance() {
        this.tokenIndex++;

        if (this.tokenIndex < this.code.length) {
            this.token = this.code[this.tokenIndex];
            return true;
        }
        this.token = '\0';
        return false;
    }

    lineEnd() {
        while (this.token === '\r' || this.token === '\n') {
            this.advance();
        }
    }

    expect(char) {
        if (this.token === char) {
            this.advance();
        } else {
            console.error('Failed to parse config file. Expected %s found %s', char, this.token);
        }
    }
}