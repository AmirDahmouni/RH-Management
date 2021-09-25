import React, { useEffect, useState } from 'react';


export default function DateFormat({date})
{

    return (
        <td>{date.substring(0,10)}</td>
    )

}