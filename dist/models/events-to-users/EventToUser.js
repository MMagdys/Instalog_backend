"use strict";
// // const { Sequelize, Model, DataTypes } = require("sequelize");
// // import UserEvent from "../event/Event"
// // import User from "../user/User"
// // const sequelize = new Sequelize('postgres://postgres:P\@ssw0rd@localhost:5432/instalog');
// // import PostgresUtil from "@pbb/utils/PostgresUtil";
// // const EventUsers = sequelize.define('EventUsers', {
// //     id: {
// //         type: DataTypes.INTEGER,
// //         // autoIncrement: true,
// //         primaryKey: true
// //     },
// //     event_id: {
// //       type: DataTypes.STRING,
// //       references: {
// //         model: UserEvent,
// //         key: 'id'
// //       }
// //     },
// //     actor_id: {
// //         type: DataTypes.STRING,
// //         references: {
// //           model: User,
// //           key: 'id',    
// //         }
// //     },
// //     target_id: {
// //         type: DataTypes.STRING,
// //         references: {
// //           model: User,
// //           key: 'id',    
// //         }
// //     },
// // }, {
// //     timestamps: false
// // });
// // // UserEvent.belongsToMany(User, { through: EventUsers, uniqueKey: 'event_id', unique: false });
// // // User.belongsToMany(UserEvent, { through: EventUsers, uniqueKey: 'actor_id', unique: false });
// // (async () => {
// //     await sequelize.sync({ force: true });
// //     // Code here
// //   })();
// // export default EventUsers;
// import PostgresUtil from "@pbb/utils/PostgresUtil";
// const {Sequelize, DataTypes} = require("sequelize");
// const sequelize = PostgresUtil.getSequelize();
// // PostgresUtil.getSequelize().then((res) => {
// //     console.log(res)
// // })
// // sequelize.authenticate().then(() => {
// //    console.log('Connection has been established successfully.');
// // }).catch((error: any) => {
// //    console.error('Unable to connect to the database: ', error);
// // });
// const Student = sequelize.define("students", {
//     student_id: {
//        type: DataTypes.UUID,
//        defaultValue: DataTypes.UUIDV4,
//     },
//     name: {
//        type: DataTypes.STRING,
//        allowNull: false
//     }
// });
// const Course = sequelize.define("courses", {
//     course_name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// });
// const StudentCourse = sequelize.define('StudentCourse', {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false
//     }
// });
// const User = sequelize.define("User", {
//     id: {
//         type: DataTypes.STRING,
//         primaryKey: true
//     },
//     name: DataTypes.STRING,
//     group: DataTypes.STRING,
// }, {
// });
// const Activity = sequelize.define('Activity', {
//     id: {
//         type: DataTypes.STRING,
//         primaryKey: true
//     },
//     object: {
//         type: DataTypes.STRING,
//     },
//     actor_id: {
//         type: DataTypes.STRING,
//         references: {
//           model: User,
//           key: 'id',    
//         }
//     },
//     target_id: {
//         type: DataTypes.STRING,
//         references: {
//           model: User,
//           key: 'id',    
//         }
//     },
// })
// const userActivity = sequelize.define('UserActivity', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     // event_id: {
//     //   type: DataTypes.STRING,
//     //   references: {
//     //     model: UserEvent,
//     //     key: 'id'
//     //   }
//     // },
//     // actor_id: {
//     //     type: DataTypes.STRING,
//     //     references: {
//     //       model: User,
//     //       key: 'id',    
//     //     }
//     // },
//     // target_id: {
//     //     type: DataTypes.STRING,
//     //     references: {
//     //       model: User,
//     //       key: 'id',    
//     //     }
//     // },
// }, {
//     timestamps: false
// })
// // Activity.belongsToMany(User, { as: 'actor_id', through: 'UserActivity'});
// // Activity.belongsToMany(User, { as: 'target_id', through: 'UserActivity'});
// // User.belongsToMany(Activity, { through: 'UserActivity' });
// Activity.belongsTo(User, { as:'actor', foreignKey: 'actor_id'});
// Activity.belongsTo(User, { as:'target', foreignKey: 'target_id'});
// const user_data = [
//     { id: "user_3VG74289PUAr", name: "Muhammad 1", group: "instatus.com"},
//     { id: "user_3VG74289PUAs", name: "Muhammad 2", group: "instatus.com"},
//     { id: "user_3VG74289PUAt", name: "Muhammad 3", group: "instatus.com"},
// ]
// const activity_data = [
//     {id: "evt_00001", object: "event", target_id: 'user_3VG74289PUAs', actor_id: 'user_3VG74289PUAr'},
//     {id: "evt_00002", object: "event"},
//     {id: "evt_00003", object: "event"},
// ]
// const userActivity_data = [
//     {ActivityId: "evt_00001", UserId: 'user_3VG74289PUAr', target_id: 'user_3VG74289PUAt'},
// ]
// sequelize.sync({ force: true }).then(() => {
//     User.bulkCreate(user_data, { validate: true }).then((res: any) => {
//         console.log(res)
//         Activity.bulkCreate(activity_data, { validate: true }).then(() => {
//             // userActivity.bulkCreate(userActivity_data, { validate: true }).then(() => {
//                 Activity.findAll({
//                     // where: {
//                     //     UserId: 'user_3VG74289PUAr'
//                     // },
//                     include: [
//                         {
//                             model: User,
//                             as: 'target',
//                             // where: {
//                             //     id: 'user_3VG74289PUAr'
//                             // },
//                         },
//                         {
//                             model: User,
//                             as: 'actor',
//                             // where: {
//                             //     id: 'user_3VG74289PUAr'
//                             // },
//                         }
//                     ],
//                 }).then((result: any) => {
//                     console.log(result[0].dataValues);
//                 // }).catch((error: any) => {
//                 //     console.error('Failed to retrieve data : ', error);
//                 // });
//             }).catch((error: any) => {
//                 console.log(error);
//             });
//         }).catch((error: any) => {
//             console.log(error);
//         });
//     }).catch((error: any) => {
//         console.log(error);
//     });
// }).catch((error: any) => {
//     console.error('Unable to create table : ', error);
// });
// const course_data = [
//     {course_name : "Science"},
//     {course_name : "Maths"},
//     {course_name : "History"}
// ]
// const student_data = [
//     {name : "John Baker", courseId: 2},
//     {name : "Max Butler", courseId: 1},
//     {name : "Ryan Fisher", courseId: 3},
//     {name : "Robert Gray", courseId: 2},
//     {name : "Sam Lewis", courseId: 1}
// ]
// const student_course_data = [
//     {studentId : 1, courseId: 1},
//     {studentId : 2, courseId: 1},
//     {studentId : 2, courseId: 3},
//     {studentId : 3, courseId: 2},
//     {studentId : 1, courseId: 2},
// ]
// Course.belongsToMany(Student, { through: 'StudentCourse'})
// Student.belongsToMany(Course, { through: 'StudentCourse'})
// // sequelize.sync({ force: true }).then(() => {
// //     Course.bulkCreate(course_data, { validate: true }).then(() => {
// //         Student.bulkCreate(student_data, { validate: true }).then(() => {
// //             StudentCourse.bulkCreate(student_course_data, { validate: true }).then(() => {
// //                 Course.findAll({
// //                     include: {
// //                         model: Student,
// //                     },
// //                 }).then((result: any) => {
// //                     console.log(result);
// //                 }).catch((error: any) => {
// //                     console.error('Failed to retrieve data : ', error);
// //                 });
// //             }).catch((error: any) => {
// //                 console.log(error);
// //             });
// //         }).catch((error: any) => {
// //             console.log(error);
// //         });
// //     }).catch((error: any) => {
// //         console.log(error);
// //     });
// // }).catch((error: any) => {
// //     console.error('Unable to create table : ', error);
// // });
