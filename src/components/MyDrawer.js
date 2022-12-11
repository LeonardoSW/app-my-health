import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";

const MyDrawer = (props) => {

    return(
        <DrawerContentScrollView {... props}>
            <DrawerItemList {... props} />
            <DrawerItem label="Sair" onPress={() => test()}/>
        </DrawerContentScrollView>
    )

    function test() {
        console.log(props.navigation);
        props.navigation.closeDrawer();
    }
}

export default MyDrawer