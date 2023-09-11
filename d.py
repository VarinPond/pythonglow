def unmask_id(masked_id):
  def is_valid_id(id_number):
   id_number = id_number.replace('-', '')
   if len(id_number) != 13:
       return False
   total = 0
   for i in range(12):
       total += int(id_number[i]) * (13 - i)
   check_digit = (11 - (total % 11)) % 10
   modified_id_number = id_number[:-1] + str(check_digit)
   modified_id_number = modified_id_number[:1] + '-' + modified_id_number[1:5] + '-' + modified_id_number[5:10] + '-' + modified_id_number[10:12] + '-' + modified_id_number[12:]
   return modified_id_number

  num_to_check = masked_id.count('*')
  clean_id_1 = masked_id.replace('-', '')
  listStarIndex =[ i+1 for i,j in enumerate(clean_id_1) if j == '*']
  valid_ids = []
  for i in range(10 ** num_to_check):
      check_str = str(i)
      candidate_id = masked_id.replace('*', check_str)
      valid = is_valid_id(candidate_id)
      valid_ids.append(valid)
      for i in valid_ids:
          if i == False:
              valid_ids.remove(i)
  CopyLsit = valid_ids.copy()
  lastRes = []
  for i in CopyLsit:
      if i not in lastRes:
          lastRes.append(i)
  windex = []
  for i in lastRes:
      for k,m in enumerate(i):
          if k not in listStarIndex:
                if i[k] != masked_id[k] and masked_id[k] != '*':
                    windex.append(i)
  for i in windex:
        if i in lastRes:
            lastRes.remove(i)
  return lastRes
#   return list(set(lastRes) - set(windex))



masked_id = '1-2345-6*890-19-8'
print(unmask_id(masked_id))