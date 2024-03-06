import requests
import json
import csv

def get_data(url:str):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            return None
    except Exception as e:
        print(e)
        return None

def find_keys(data, target):
    count = 0
    if not isinstance(data, dict):
        return None
    if target in data:
        return data[target]
    for key in data.keys():
        result = find_keys(data[key], target)
        if result is not None:
            count += result
    return count
    
def create_output(api1, api2):
   api1_data = find_keys(get_data(api1), 'count')
   api2_data = find_keys(get_data(api2), 'count')

   if api1_data == api2_data:
       return 'pass'
   else:
       return 'fail'

def main():
    api1 = 'https://www.feefo.com/api/feedbacks/count/currys?displayFeedbackType=PRODUCT&locale=en-gb&pageNumber=0&sku=10239769&sort=newest&tags=%7B%7D&timeFrame=YEAR'
    api2= 'https://api.feefo.com/api/10/reviews/summary/product?locale=en_GB&product_sku=10239769&origin=www.currys.co.uk&merchant_identifier=currys&since_period=YEAR'

    count_dict = {}

    count_dict['api1'] = find_keys(get_data(api1), 'count')
    count_dict['api2'] = find_keys(get_data(api2), 'count')
    compare_test = create_output(api1, api2)

    with open('api-comparison.csv', 'w') as csvfile:
        fieldnames = ['api1', 'api2', 'comparison']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        writer.writeheader()
        writer.writerow({'api1': count_dict['api1'], 'api2': count_dict['api2'], 'comparison': compare_test})

main()