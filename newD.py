def unmask_id(masked_id):
    num_to_check = masked_id.count('*')
    valid_ids = []
    clean_id_1 = masked_id.replace('-', '')
    listStarIndex =[ i+1 for i,j in enumerate(clean_id_1) if j == '*']
    for i in range(10 ** num_to_check):
        oldID = [int((j+1)%10) for j in range(12)]
        runID = [int((j+1)%10)*(13-j) for j in range(12)]
        sumRunID = sum(runID)
        genID = sum(runID)%11
        LastID  = str((11-genID)%10)
        strID = ''
        for h in oldID:
            strID += str(h)
        if ( 13 in listStarIndex):
            pass
        else:
            newValueList = [i*(13-i) for i in listStarIndex]
            realList = [int(j/i) for i,j in zip(listStarIndex, newValueList)]
            diffSum = sumRunID - sum(newValueList)
            print(newValueList, listStarIndex, realList)

        fullID = strID+LastID
    
masked_id = '1-2345-678*0-1*-4'
print(unmask_id(masked_id))