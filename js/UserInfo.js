export class UserInfo {
  constructor(form, name, job) {
    this.form = form;
    this.name = name;
    this.job = job;    
  }
  setUserInfo() {
    this.form.elements.name.value = this.name.textContent;
    this.form.elements.info.value = this.job.textContent;
  }
  updateUserInfo(name, info) {
    this.name.textContent = name;
    this.job.textContent = info;
  }
}