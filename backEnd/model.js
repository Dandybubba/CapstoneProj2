module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        description: {
          type:String,
          required:true
        },
        completed:{ 
          type:Boolean,
          default: false
        }
      }
    );
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    const ToDoItem = mongoose.model("todoitem", schema);
    return ToDoItem;
  };