const mongoose = require("mongoose")
const ToDoItem = require("./model.js")(mongoose);

//create a new object
exports.create = (req, res) => {
    // Validate request
    if (!req.body.description) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // Create a Tutorial
    const todoitem = new ToDoItem({
      completed:req.body.completed,
      description: req.body.description,
      
    });
    // Save Tutorial in the database
    todoitem
      .save(todoitem)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the TodoItem."
        });
      });
  };

  // Retrieve Objects

  exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    ToDoItem.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving todoitem."
        });
      });
  };

  //Update Object

  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const id = req.params.id;
    ToDoItem.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Todoitem with id=${id}. Maybe Todoitem was not found!`
          });
        } else res.send({ message: "Todoitem was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Todoitem with id=" + id
        });
      });
  };

  //Delete Object

  exports.delete = (req, res) => {
    const id = req.params.id;
    ToDoItem.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Todoitem with id=${id}. Maybe Todoitem was not found!`
          });
        } else {
          res.send({
            message: "Todoitem was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Todoitem with id=" + id
        });
      });
  };

  //Find All Objects

  exports.findAllPublished = (req, res) => {
    ToDoItem.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving todoitems."
        });
      });
  };