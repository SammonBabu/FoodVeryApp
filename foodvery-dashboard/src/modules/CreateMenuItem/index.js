import { Form, Input, Button, Card, InputNumber, message } from "antd";
import { DataStore,Storage } from "aws-amplify";
import { Dish } from "../../models";
import { useRestaurantContext } from "../../contexts/RestaurantContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const { TextArea } = Input;

const CreateMenuItem = () => {
  const { restaurant } = useRestaurantContext();
  const navigation = useNavigate();

  const [img, setImg] = useState();
  
  // state = {fileUrl: "", file:"",fileName:""}
  // handleChange = e => {
  //   const file = e.target.files[0]
  //   this.setState({
  //     fileUrl:URL.createObjectURL(file),
  //     file,
  //     fileName:file.name
  //   })
  //   saveFile = ()=>{
  //     Storage.put(this.state.fileName,this.state.file).then(()=>{
  //       console.log('successfully saved file!');
  //       this.setState({fileUrl:"",file:"",fileName:""})
  //     }).catch(err => {
  //       console.log('error uploading file',err);
  //     })
  //   }
  // }

  const onFinish = async ({ name, description, price }) => {
   // console.log("image data",img["name"]);
  //  const {key} = await Storage.put(img["name"], img, {
  //     contentType: "image/png, image/jpeg",
  //   });
 
//    const imageUrl = Storage.get(img["name"], { level: 'public' })
// .catch(err => console.log(err));
   //console.log("image data--",imageUrl);
    DataStore.save(
      new Dish({
        name,
        description,
        price,
        //image:key,
        restaurantID: restaurant.id,
      })
    );
    message.success("Dish is added!");
    navigation("/menu");
  };
  const onFinishFailed = () => {
    message.error("Dish is not added!");
  };

  return (
    <Card title="New Menu Item" style={{ margin: 20 }}>
      <Form
        layout="vertical"
        wrapperCol={{ span: 8 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Dish Name"
          name="name"
          rules={[{ required: true }]}
          required
        >
          <Input placeholder="Enter dish name" />
        </Form.Item>
        <Form.Item
          label="Dish Description"
          name="description"
          rules={[{ required: true }]}
          required
        >
          <TextArea rows={4} placeholder="Enter dish description" />
        </Form.Item>
        <Form.Item
          label="Price (₹)"
          name="price"
          rules={[{ required: true }]}
          required
        >
          <InputNumber />
        </Form.Item>
        {/* <Form.Item
          label="Dish Image(jpeg/png)"
          name="image"
          rules={[{ required: true }]}
          required
        >
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </Form.Item> */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateMenuItem;
