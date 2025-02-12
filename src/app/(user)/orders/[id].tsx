import OrderItemListItem from '@/components/OrderItemListItem';
import OrderListItem from '@/components/OrderListItem';
import orders from '@assets/data/orders';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Text, View, FlatList} from 'react-native';

export default function OrderDetailsScreen() {
    const { id } = useLocalSearchParams();
    const order = orders.find((o) => o.id.toString() === id);

    if (!order) {
        return <Text>Not found!</Text>
    }

    return (
        <View style={{ padding: 10, gap: 20 }}>
            <Stack.Screen options={{ title: `Order #${id}`}} />
            {/* <OrderListItem order={order} /> */}
            <FlatList
                data={order.order_items}
                renderItem={({ item }) => <OrderItemListItem item={item} />}
                contentContainerStyle={{ gap: 10}}
                ListHeaderComponent={() => <OrderListItem order={order} />}
                ListFooterComponent={() => <OrderListItem order={order} />}
            />
        </View>
    )
}
