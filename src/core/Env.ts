import {DevEnv} from "ic10";

class Env extends DevEnv {
  constructor() {
	super();
	this.reset()
  }

  reset(){
	  this.data = {}
	  this.data['r0'] = 0
	  this.data['r1'] = 0
	  this.data['r2'] = 0
	  this.data['r3'] = 0
	  this.data['r4'] = 0
	  this.data['r5'] = 0
	  this.data['r6'] = 0
	  this.data['r7'] = 0
	  this.data['r8'] = 0
	  this.data['r9'] = 0
	  this.data['r10'] = 0
	  this.data['r11'] = 0
	  this.data['r12'] = 0
	  this.data['r13'] = 0
	  this.data['r14'] = 0
	  this.data['r15'] = 0
	  this.data['r16'] = 0
	  this.data['r17'] = 0
  }
}
export default Env;
