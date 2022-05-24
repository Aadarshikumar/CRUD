const fs = require('fs');
const input = require('readline-sync');
const l = [];

console.log("1. Press 1 for Create \n2. Press 2 for Delete\n3. Press 3 for Update\n4. Press 4 for READ");
let opt = input.questionInt("Please enter OPTION, what do you want: ");
function option() {
    if (opt === 1) {
        return create();
    }
    else if (opt == 2) {
        return Delete();
    }
    else if (opt == 3) {
        return Update();
    }
    else if (opt == 4) {
        return READ();
    }
    else {
        console.log("Please enter valid input. ");
        return
    }

    function create() {
        if (fs.existsSync("CRUD.json")) {
            let file_data = fs.readFileSync("CRUD.json", "utf-8");
            let convert = JSON.parse(file_data);
            let email = input.question("Enter your E-mail: ")  // email=> it will check that it is present in your file or not...
            if ((email.includes("@")) && (email.includes(".com"))) {
                let check = true;                             // here we took a variable who's value is true;
                for (let i in convert) {
                    if (convert[i]["Email"] === email) {
                        check = false;
                        console.log("Data is Already Present....");
                    }
                }
                if (check) {
                    let json_Data = JSON.parse(file_data);
                    // console.log("No E-mail is found....");
                    const biodata = {
                        Email: email,
                        password: input.question("Enter your Password: "),
                        Name: input.question("Enter you Name: "),
                        Age: input.question("Enter you Age: "),
                        qualification: input.question("Enter you Qualification: "),
                        city: input.question("Name the city where do you live: ")
                    }
                    json_Data.push(biodata);
                    let whole_data = JSON.stringify(json_Data, null, 3);
                    fs.writeFileSync("CRUD.json", whole_data);
                    console.log("Registered Successfully...");
                }
            }
            else {
                console.log("Please enter the valid email id with (@) and (.com)");
            }
        }
        else {
            fs.writeFileSync("CRUD.json", JSON.stringify(l));
            create();
        }
    }

    function Update() {
        let Read = fs.readFileSync("CRUD.json", "utf-8");
        let Read_data = JSON.parse(Read)
        let email = input.question("Enter your Email for conforming: ");

        for (let detail in Read_data) {
            if ( Read_data[detail]["Email"] == email) {
                Read_data.splice(detail, 1);
                console.log("Data has been deleted...");

                let update_biodata = {
                    Email: email,
                    password: input.question("Enter your updated Password: "),
                    Name: input.question("Enter you  updated Name: "),
                    Age: input.question("Enter you  updated Age: "),
                    qualification: input.question("Enter you updated Qualification: "),
                    city: input.question("Where do you live now: ")

                }

                Read_data.push(update_biodata)
                let jsonData=JSON.stringify(Read_data,null,3)
                console.log(jsonData);
    
                fs.writeFileSync("CRUD.json",(jsonData))
            }
        }
    }

    function Delete() {
        let Read = JSON.parse(fs.readFileSync("CRUD.json", "utf-8"));
        let email = input.question("Enter your email for conforming: ");
        for (let i in Read) {
            if (Read[i]["Email"] == email) {
                Read.splice(i, 1)
                let read1 = JSON.stringify(Read, null, 3);
                fs.writeFileSync("CRUD.json", read1)
            }
        }
    }

    function READ() {
        let Read_data = JSON.parse(fs.readFileSync("CRUD.json", "utf-8"));
        let Email = input.question("Enter your E-mail: ");
        let Password = input.question("Enter your password: ");
        let check = true;
        for (let i in Read_data) {
            if ((Read_data[i]["Email"] == Email) && (Read_data[i]["password"] == Password)) {
                check = false;
                console.log(" You have login successfully...");
                console.log(Read_data[i])

            }
        }
        if (check) {
            console.log("Your Email or Password may be wrong, please try again...");
        }
    }
}
option();