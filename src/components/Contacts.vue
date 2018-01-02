<template>
  <div id="box">
    <el-container>
    <el-main>
      <h1>Contacts</h1>
      <el-card class="box-card">
        <div id="content">
          <el-table v-if="contacts.length != 0"
            :data="contacts"
            height="700"
            border
            style="width: 100%">
            <el-table-column
            align="center"
              prop="name"
              label="Name"
              width="180">
            </el-table-column>
            <el-table-column
            align="center"
              prop="phone"
              label="Phone"
              width="180">
            </el-table-column>
            <el-table-column
            align="center"
              prop="qq"
              label="QQ">
            </el-table-column>
            <el-table-column
            align="center"
              prop="wechat"
              label="Wechat">
            </el-table-column>
            <el-table-column
            align="center"
              prop="email"
              label="Email">
            </el-table-column>
            <el-table-column 
            label="Operation"
            align="center">
            <template slot-scope="scope">
              <el-button
                @click="modifyContact(scope.row)" icon="el-icon-edit"></el-button>
                <el-popover
                  ref="popover5"
                  placement="top"
                  width="160"
                  v-model="visible">
                  <p>Are you sure you want to delete this contact?</p>
                  <div style="text-align: right; margin: 0">
                      <el-button type="text" @click="visible = false">no</el-button>
                      <el-button type="primary" @click="visible = false">yes</el-button>
                  </div>
                </el-popover>
                <el-button
                  type="danger"
                  @click="deleteContact(scope.row)"
                  icon="el-icon-delete">
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <h1 v-if="contacts.length==0">You don't seem to have any contact</h1>
          <el-dialog :visible.sync="openform">
          <el-form ref="modify-form" :model="newContact" label-width="80px" :rules="rules">
            <el-form-item label="name" prop="name">
                <el-input v-model="newContact.name" :disabled="newContact.id!==-1"></el-input>
            </el-form-item>
            <el-form-item label="phone" prop="phone">
                <el-input v-model="newContact.phone"></el-input>
            </el-form-item>
            <el-form-item label="qq" prop="qq">
                <el-input v-model="newContact.qq"></el-input>
            </el-form-item>
            <el-form-item label="wechat" prop="wechat">
                <el-input v-model="newContact.wechat"></el-input>
            </el-form-item>
            <el-form-item label="email" prop="email">
                <el-input v-model="newContact.email"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleUpload()">Submit</el-button>
                <el-button @click="openform=false">Cancel</el-button>
            </el-form-item>
          </el-form>
          </el-dialog>
        </div>
      </el-card>
    </el-main>
    <el-dialog width="90%" title="Search Results" :visible.sync="openSearch">
      <h1 v-if="searchData.contacts.length==0">No search results found</h1>
      <el-table v-if="searchData.contacts.length != 0"
            :data="searchData.contacts"
            height="500px"
            border>
            <el-table-column
            align="center"
              prop="name"
              label="Name"
              width="180">
            </el-table-column>
            <el-table-column
            align="center"
              prop="phone"
              label="Phone"
              width="180">
            </el-table-column>
            <el-table-column
            align="center"
              prop="qq"
              label="QQ">
            </el-table-column>
            <el-table-column
            align="center"
              prop="wechat"
              label="Wechat">
            </el-table-column>
            <el-table-column
            align="center"
              prop="email"
              label="Email">
            </el-table-column>
            <el-table-column 
            label="Operation"
            align="center">
            <template slot-scope="scope">
              <el-button
                @click="modifyContact(scope.row)" icon="el-icon-edit"></el-button>
                <el-popover
                  ref="popover5"
                  placement="top"
                  width="160"
                  v-model="visible">
                  <p>Are you sure you want to delete this contact?</p>
                  <div style="text-align: right; margin: 0">
                      <el-button type="text" @click="visible = false">no</el-button>
                      <el-button type="primary" @click="visible = false">yes</el-button>
                  </div>
                </el-popover>
                <el-button
                  type="danger"
                  @click="deleteContact(scope.row)"
                  icon="el-icon-delete">
                </el-button>
              </template>
            </el-table-column>
          </el-table>
    </el-dialog>
    <el-aside width="200px">
      <div id="search-div">
        <el-popover
          ref="search"
          placement="left"
          width="400"
          trigger="click">
          <el-form :inline="true" ref="search-form" :model="searchData" label-width="80px" :rules="rules">
            <el-form-item label="name" prop="name">
                <el-input v-model="searchData.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search">Search</el-button>
            </el-form-item>
          </el-form>
        </el-popover> 
        <el-button round type="primary" icon="el-icon-search" v-popover:search></el-button>
        <!-- </el-tooltip> -->
      </div>
      <div id="add-div">
        <el-tooltip class="item" effect="dark" content="Add new Contact" placement="top-start"> 
        <el-button round type="primary" icon="el-icon-plus" @click="addContact"></el-button>
        </el-tooltip>
      </div>    
      <div id="logout-div">
        <el-tooltip class="item" effect="dark" content="Logout" placement="top-start"> 
        <el-button round type="danger" icon="el-icon-upload2" @click="logout"></el-button>
        </el-tooltip>
      </div>
    </el-aside>
  </el-container>
</div>
</template>

<script>
let axios = require('axios');
export default {
  name: 'Contacts',
  data () {
    return {
      visible: false,      
      contacts: [],
      newContact: {
        id: -1,
        name: '',
        phone: '',
        qq: '',
        wechat: '',
        email: ''
      },
      searchData: {
        name: '',
        contacts: []
      },
      openSearch: false,
      csrftoken: '',
      openform: false,
      rules: {
        name: [
          {required: true, message: 'Please input contact\'name. ', trigger: 'blur'},
          {type: 'string', pattern:"^[A-Za-z0-9]+$", trigger: 'blur'}
        ],
        phone: [
          {required: true, message: 'Please input phone number', trigger: 'blur'},
          {
            type: 'string', 
            pattern: "^[0-9]{11}$",
            message: 'phone not valid!', 
            trigger: 'blur'
          }
        ],
        qq: [
          {
            type: 'string',
            pattern:"[1-9][0-9]{4,}",
            message: 'qq not valid!', 
            trigger: 'blur'
          }
        ],
        wechat: [
          {
            type: 'string', 
            pattern:"^[A-Za-z0-9]+$",
            message: 'wechat not valid!',
            trigger: 'blur'
          }
        ],
        email: [
          {
            type: 'email', 
            pattern:"^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$",
            message: 'email not valid!',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    addContact() {
      this.openform = true;
       this.newContact = {
                id: -1,
                name: '',
                phone: '',
                qq: '',
                wechat: '',
                email: ''
              }
    },
    deleteContact(contact) {
      this.$confirm(`This operation will delete the contacts forever,
                     are you sure you want to continue?`, 'Warning', {
          confirmButtonText: 'yes',
          cancelButtonText: 'no',
          type: 'warning',
          center: true
        }).then(() => {
         
          axios.get('api/contacts/', {
            params: {
              id: contact.id,
              type: 'delete'
            }
          }).then(res => {
            let index = this.contacts.indexOf(contact);
            if(index > -1) {
              this.contacts.splice(index, 1);
            }
            this.$message({
              type: 'success',
              message: 'contacts removed'
            });
          }).catch(error => {
            console.log(error)
            this.$message({
            type: 'info',
            message: 'unknown error'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'delete canceled'
          });
        });
    },
    search() {
      this.$refs['search-form'].validate(valid => {
        if(valid) {
          this.searchData.contacts = [];
      let contacts = this.contacts;
      for(let contact of contacts) {
        if(contact.name.includes(this.searchData.name)) {
          this.searchData.contacts.push(contact);
        }
      }
      this.openSearch = true;
      this.searchData.name = '';
        }
      })
      this.$refs['search-form'].clearValidate()
    },
    dispath() {
        let type = 'add'
        if(this.newContact.id != -1) {
            type = 'modify'
            
        }
        let instance = axios.create({
            headers: {"X-CSRFToken": this.csrftoken}
            });
        console.log(this.csrftoken)
        instance.post('api/contacts/', {
            contact: this.newContact,
            type: type
        }).then(res => {
            let data = res.data
            console.log(data)
            if (data.status != '0') {
             this.$message.warning(data.msg)
             return;
            }
            if(data.type == "add") {
              this.$message.success("add success!");
              this.contacts.push(data.data);
            } else {
              this.$message.success("modify success!");
              let index = this.contacts.indexOf(data.data);
              if(index > -1) {
                this.contacts[index] = data.data
              }
            }
        }).catch(error => {
            console.log(error)
            this.$message.error('unknown error')
        });
        this.openform = false;
    },
    modifyContact(contact) {
        this.openform =true;
        this.newContact = contact
    },
    logout() {
      this.$confirm('Do you want to logout?', 'Hit', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning',
          center: true
        }).then(() => {
          axios.get('/api/logout/').then(res => {
            let data = res.data
            if(data.status !== '0') {
              console.log(data.msg);
            } else {
              this.$message('please login again')
              this.$router.push('/')
            }
          }).catch(error => {
            console.log(error)  
            this.$message({
              type: 'error',
              message: 'unknown error'
            })
          })
        });
    },
    handleUpload() {
      this.$refs['modify-form'].validate(valid => {
        if(valid) {
          this.dispath()
        } else {
          this.$message.warning('please finish your form first!')
        }   
      })
      this.$refs['modify-form'].clearValidate()
    }
  },
  mounted() {
    this.csrftoken = this.$cookie.get('csrftoken')
    this.$emit('loading', true);
    axios.get('api/contacts/', {
        params: {
              type: 'get'
        }
    }).then( res => {
      console.log(res)
      let data = res.data
      console.log(data)
      if(data.status == '0') {
        this.contacts = data.contacts;
        console.log(this.contacts)
      } else if(data.status == '-1') {
        this.$router.push('/');
        this.$message.error(data.msg)
      }
      setTimeout(()=>{this.$emit('loading', false)},500)
    }).catch((error)=>{
      console.log(error);
      this.$emit('loading', false);
    });
  }
}
</script>
<style scoped>
h1 {
  font-size: 40px
}

.box-card {
  margin-top: 0%;
}

#content {
  height: 700px;
}

#search-div {
  margin-top: 100%
}

#add-div {
  margin-top: 100%;
}

#logout-div {
  margin-top: 100%;
}

.box-card {
  background-color: antiquewhite;
}

</style>
